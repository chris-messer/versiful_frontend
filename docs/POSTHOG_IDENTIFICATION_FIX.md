# PostHog User Identification Fix

## Issue Summary

User `019c200b-f248-7253-8869-e0dc2fe874e6` appeared as an anonymous user even after creating an account, instead of being identified by their email address.

## Root Cause Analysis

### Previous Fix Attempt (Commits e0c1a35 & 8bdd81a)

**What was done:**
- Added `posthog.alias()` call in `AuthContext.jsx` in the `checkLoginState()` function
- Fixed the order: `identify()` first, then `alias()` second

**Why it didn't fully work:**
The alias code was **ONLY in `AuthContext.checkLoginState()`**, which runs:
- On initial page load
- When PostHog becomes available (dependency in useEffect)

### The Actual Problem: Race Condition at Signup

When a new user signs up, here's what happens:

```
1. User visits landing page
   → PostHog assigns anonymous ID: 019c200b-f248-7253-8869-e0dc2fe874e6
   → Pageview events tracked with this anonymous ID

2. User clicks "Sign up" → navigates to /signin

3. User submits signup form (SignIn.jsx):
   - Calls /auth/signup endpoint ✅
   - Calls /users endpoint to get userData ✅
   - Sets setIsLoggedIn(true) ✅
   - navigate("/welcome") ✅ ← NAVIGATES IMMEDIATELY
   ❌ NO PostHog identification happens here!

4. User is now on /welcome page:
   - May generate new events (pageview, clicks, etc.)
   - Still using anonymous ID because identify() wasn't called yet
   - AuthContext.checkLoginState() runs eventually, but too late
```

**Same issue with Google OAuth:**
- `Callback.jsx` authenticates the user and navigates immediately
- No PostHog identification before navigation

### Timeline of Events

```
Time 0:00  User lands on homepage → PostHog creates anonymous ID (019c200b-...)
Time 0:05  User clicks "Sign up"
Time 0:10  User fills out form and submits
Time 0:11  Backend creates account ✅
Time 0:11  SignIn.jsx navigates to /welcome ❌ (before identifying user)
Time 0:12  User generates pageview event on /welcome → still anonymous! ❌
Time 0:15  AuthContext.checkLoginState() runs → calls identify() + alias()
Time 0:15  But it's too late - events already sent as anonymous
```

## The Fix

### What Changed

Added PostHog identification **directly in the authentication flow**, BEFORE navigation:

#### 1. SignIn.jsx (Email/Password Auth)

```javascript
// After getting userData from /users endpoint:
const userData = await userCheckResponse.json();
setIsLoggedIn(true);

// CRITICAL: Identify user immediately, before navigation
if (userData && posthog) {
    const userId = userData.userId;
    const currentDistinctId = posthog.get_distinct_id();
    
    // Build person properties
    const personProperties = { /* ... */ };
    
    // Step 1: Identify user
    posthog.identify(userId, personProperties);
    
    // Step 2: Link anonymous events if needed
    if (currentDistinctId !== userId && currentDistinctId.includes('-')) {
        posthog.alias(userId, currentDistinctId);
    }
    
    // Step 3: Mark internal users
    identifyInternalUser(posthog, userData.email);
}

// THEN navigate (user is now properly identified)
navigate("/welcome");
```

#### 2. Callback.jsx (Google OAuth)

Same logic added after OAuth callback completes, before navigation.

### Why This Works

✅ **Immediate Identification**: User is identified at the exact moment of signup/login
✅ **Before Navigation**: Anonymous events are aliased BEFORE loading new pages
✅ **No Race Condition**: Doesn't rely on AuthContext useEffect timing
✅ **Comprehensive**: Covers both email/password AND Google OAuth flows

### New Timeline

```
Time 0:00  User lands on homepage → PostHog creates anonymous ID (019c200b-...)
Time 0:05  User clicks "Sign up"
Time 0:10  User fills out form and submits
Time 0:11  Backend creates account ✅
Time 0:11  SignIn.jsx identifies user in PostHog ✅
Time 0:11  SignIn.jsx calls alias() to link anonymous events ✅
Time 0:11  SignIn.jsx navigates to /welcome ✅
Time 0:12  User generates pageview event on /welcome → properly identified! ✅
Time 0:15  AuthContext.checkLoginState() runs → user already identified (no-op)
```

## Historical Fix for Existing Users

For users who already experienced this issue (like user `019c200b-f248-7253-8869-e0dc2fe874e6`), use the merge script:

```bash
# Find the user's IDs in PostHog:
# 1. Go to PostHog → Persons
# 2. Search for the user by email
# 3. Look at "Distinct IDs" section
# 4. userId = Cognito ID (long alphanumeric)
# 5. anonymousId = UUID format (019c200b-...)

# Run the merge script:
cd /Users/christopher.messer/PycharmProjects/versiful-backend/scripts
python merge_posthog_user.py <userId> <anonymousId>

# Example:
python merge_posthog_user.py abc123-cognito-id-xyz 019c200b-f248-7253-8869-e0dc2fe874e6
```

## Testing

To verify the fix works:

1. **Clear PostHog state**: Open dev console and run:
   ```javascript
   posthog.reset()
   localStorage.clear()
   ```

2. **Simulate new user**:
   - Visit landing page (generates anonymous ID)
   - Click around (generates some anonymous events)
   - Sign up with a new email
   - Check console logs for:
     ```
     🔍 PostHog Identify (SignIn): ...
     📝 Calling posthog.identify (SignIn): ...
     🔗 Linking anonymous events to user (SignIn): ...
     ```

3. **Verify in PostHog**:
   - Go to PostHog → Persons
   - Search for the new user's email
   - Verify all events (including landing page visits) are linked to the user

## Files Modified

- `src/pages/SignIn.jsx` - Added PostHog identification before navigation
- `src/pages/Callback.jsx` - Added PostHog identification before navigation
- `src/context/AuthContext.jsx` - Already had alias logic (kept as backup/redundancy)

## Key Takeaway

**The previous fix worked in AuthContext, but didn't run early enough in the signup flow.**

The new fix ensures identification happens at the **critical moment** - immediately after account creation, before any navigation that could generate new events.

