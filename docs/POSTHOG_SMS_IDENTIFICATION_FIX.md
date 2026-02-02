# PostHog SMS User Identification Issue - Root Cause Analysis

## Issue Summary

Users who text Versiful **before** creating a web account have their SMS events tracked with their phone number as the `distinct_id`. When they later create an account and add their phone number, those previous SMS events are NOT linked to their user account, resulting in split identity in PostHog.

## Root Cause

### Expected Flow (What Documentation Says)

From `docs/POSTHOG_USER_IDENTIFICATION.md` line 260-270:

> ### Alias for Merging Identities
>
> If needed, use PostHog's alias to merge anonymous and identified users:
>
> ```javascript
> // If user was tracked anonymously, then logged in
> const anonymousId = posthog.get_distinct_id();
> posthog.alias(userData.userId, anonymousId);
> ```
>
> **Currently**: Not implemented (most users identify immediately upon signup).

**The documentation says it's "Not implemented" - and that's the problem!**

### Actual Flow (What's Broken)

#### Scenario: User Texts THEN Creates Account

1. **User texts +1-555-123-4567 without account**:
   ```
   SMS Handler (sms_handler.py line 511):
   - Looks up user_id from phone: None
   - Calls chat handler with phone_number only
   
   Agent Service (_create_posthog_callback line 228-235):
   - user_id = None
   - phone_number = "+15551234567"
   - distinct_id = "15551234567" (digits only)
   
   PostHog Events:
   - distinct_id: "15551234567"
   - All LLM traces tagged with phone number
   ```

2. **User creates web account**:
   ```
   SignIn.jsx / Callback.jsx:
   - posthog.identify(userId, {...properties})
   - distinct_id: userId (e.g., "google_123456")
   
   PostHog Events:
   - distinct_id: "google_123456"
   - User properly identified
   ```

3. **User adds phone number in Welcome form**:
   ```
   WelcomeForm.jsx (line 135-151):
   - Calls PUT /users with phoneNumber
   - Updates DynamoDB users table
   - navigate("/getting-started")
   
   ❌ NO posthog.alias() call!
   ❌ Previous SMS events stuck on "15551234567" ID
   ```

4. **User texts again AFTER registration**:
   ```
   SMS Handler (sms_handler.py line 497-511):
   - decision = _evaluate_usage(from_num_normalized)
   - user_profile = get_user_by_id(user_id) if user_id else None
   - user_id = "google_123456" ✅ Found!
   
   Agent Service (_create_posthog_callback line 228-235):
   - user_id = "google_123456" ✅
   - distinct_id = "google_123456" ✅
   
   PostHog Events:
   - distinct_id: "google_123456" ✅
   - Correctly linked to user account
   ```

### Result

**Two separate identities in PostHog:**
- Identity 1: `15551234567` (phone number) - Has pre-registration SMS events
- Identity 2: `google_123456` (userId) - Has all web events + post-registration SMS events

**They are NOT linked!**

## The Fix

### What Was Changed

Added `posthog.alias()` call in `WelcomeForm.jsx` immediately after user adds their phone number:

```javascript
// After successful PUT /users with phoneNumber:
if (posthog && userData && userData.userId) {
    const phoneDigitsOnly = digitsOnly; // Phone without +1
    
    console.log('🔗 Linking phone number events to user:', {
        userId: userData.userId,
        phoneNumber: phoneDigitsOnly
    });
    
    // Alias phone number ID to user ID
    // This merges all previous SMS events into the user's account
    posthog.alias(userData.userId, phoneDigitsOnly);
    
    console.log('✅ Phone number events linked to user account');
}
```

### Why This Works

**PostHog alias() semantics:**
```javascript
posthog.alias(newId, oldId)
```
- `newId`: The canonical identity (userId)  
- `oldId`: The old/anonymous identity to merge (phone number)

**Effect:**
- All events with `distinct_id = "15551234567"` are now linked to `distinct_id = "google_123456"`
- User's PostHog profile shows complete history: SMS events + web events
- Future SMS events continue to use userId (from backend lookup)

### When Alias Happens

```
Time 0:00  User texts without account
           → PostHog events with distinct_id = "15551234567"

Time 1:00  User creates web account  
           → posthog.identify(userId) in SignIn.jsx
           → PostHog creates person profile with distinct_id = "google_123456"

Time 1:05  User completes Welcome form with phone number
           → PUT /users with phoneNumber
           → posthog.alias("google_123456", "15551234567") ← NEW!
           → All previous SMS events now linked to user

Time 2:00  User texts again
           → SMS handler finds userId from phone lookup
           → PostHog events use distinct_id = "google_123456"
           → Everything is linked! ✅
```

## Historical Fix for Existing Users

For users who already have split identities (like the user mentioned in the original issue):

```bash
cd /Users/christopher.messer/PycharmProjects/versiful-backend/scripts

# Find the user's IDs:
# 1. Go to PostHog → Persons
# 2. Search for user by email or phone
# 3. Note their userId (Cognito ID) and phone number

# Run merge script:
python merge_posthog_user.py <userId> <phoneNumberDigitsOnly>

# Example:
python merge_posthog_user.py google_123456 15551234567
```

## Backend SMS Flow (For Reference)

### How userId is Retrieved

**File:** `lambdas/sms/sms_handler.py`

```python
# Line 497: Evaluate usage limits and get user profile
decision = _evaluate_usage(from_num_normalized)

# Line 511: Extract userId if available
user_id = decision.get("user_profile", {}).get("userId")

# Line 515-520: Pass to chat handler
chat_result = _invoke_chat_handler(
    thread_id=from_num_normalized,
    message=body,
    user_id=user_id,              # ✅ Passed to PostHog
    phone_number=from_num_normalized
)
```

**File:** `lambdas/sms/sms_handler.py` - `_evaluate_usage()` function

```python
# Line 113: Get SMS usage record (contains userId if registered)
usage = get_sms_usage(phone_number)

# Line 114: Extract userId from usage record
user_id = usage.get("userId")

# Line 115: Fetch full user profile from users table
user_profile = get_user_by_id(user_id) if user_id else None

# Returns user_profile in decision dict
```

**How userId Gets Into SMS Usage:**
- When user adds phone in Welcome form → PUT /users
- Backend creates/updates record in `prod-versiful-sms-usage` table with userId
- Future SMS lookups find the userId via phone number

### How distinct_id is Determined

**File:** `lambdas/chat/agent_service.py` - `_create_posthog_callback()`

```python
# Line 228-235: Determine distinct_id priority
if user_id:
    distinct_id = user_id                    # ✅ Priority 1: Use userId if available
elif phone_number:
    distinct_id = re.sub(r'\D', '', phone_number)  # Priority 2: Use phone (digits only)
else:
    distinct_id = session_id                 # Priority 3: Fallback to session
```

**Result:**
- Registered user texting → `distinct_id = userId` ✅
- Unregistered user texting → `distinct_id = phoneDigitsOnly`
- Web user chatting → `distinct_id = userId` ✅

## Files Modified

### Frontend
- `src/components/welcome/WelcomeForm.jsx` - Added posthog.alias() when user adds phone number

### Backend (Already Correct)
- `lambdas/sms/sms_handler.py` - Passes userId to chat handler ✅
- `lambdas/chat/agent_service.py` - Uses userId as distinct_id if available ✅

## Testing

To verify the fix:

### 1. New User Flow

```bash
# Simulate user texting BEFORE account creation:
# (Use a test phone number or manually create PostHog events)

# 1. Create some SMS events with phone number as distinct_id
# 2. Create account on website
# 3. Add phone number in Welcome form
# 4. Check browser console for:
```

```javascript
🔗 Linking phone number events to user: {userId: "...", phoneNumber: "..."}
✅ Phone number events linked to user account
```

```bash
# 5. Verify in PostHog:
#    - Go to Persons → Search by email
#    - Click on user profile
#    - Verify "Distinct IDs" shows both userId AND phone number
#    - Verify all events (SMS + web) are shown under one profile
```

### 2. Historical Fix

```bash
# For users who already experienced the split:
cd /Users/christopher.messer/PycharmProjects/versiful-backend/scripts
python merge_posthog_user.py <userId> <phoneDigitsOnly>
```

## Key Takeaways

1. **Frontend Issue**: Missing `posthog.alias()` when user adds phone number
2. **Backend Correct**: Already passes userId correctly for SMS events (after registration)
3. **Timing Critical**: Alias must happen when phone is added, not when they text
4. **Two Fixes Needed**:
   - ✅ Frontend fix (this PR) - Prevents future splits
   - ✅ Backend script (existing) - Fixes historical splits

## Related Documentation

- `docs/POSTHOG_USER_IDENTIFICATION.md` - User identification strategy
- `docs/POSTHOG_LLM_TRACING.md` - LLM analytics integration
- `scripts/merge_posthog_user.py` - Historical fix script
- `scripts/merge_posthog_user.js` - Historical fix script (Node.js version)

