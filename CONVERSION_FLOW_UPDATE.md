# Conversion Flow Update - Getting Started Page

## Problem
Users were dropping off at the subscription page after signing up because they were being asked to commit before experiencing the product value.

## Solution
Created a "Getting Started" page that:
1. Confirms users are enrolled in the free tier (5 messages/month)
2. Immediately shows them how to use the product via SMS
3. Emphasizes SMS as the primary product
4. Mentions web chat as a secondary option
5. Removes friction by not forcing subscription choice upfront
6. **NEW:** Detects when free tier is exhausted and routes users to upgrade page

## Changes Made

### New Files
- **`src/pages/GettingStarted.jsx`** - New onboarding page that emphasizes SMS usage and shows clear next steps

### Modified Files - Frontend

1. **`src/App.jsx`**
   - Added route for `/getting-started` page
   - Imported GettingStarted component

2. **`src/pages/Callback.jsx`**
   - Updated routing logic: users who are registered but not subscribed now go to `/getting-started` instead of `/subscription`
   - **NEW:** Added SMS usage check - if free tier exhausted (5+ messages), route to `/subscription?exhausted=true`
   - Improved logging messages for clarity

3. **`src/components/welcome/WelcomeForm.jsx`**
   - Changed navigation destination from `/subscription` to `/getting-started` after phone registration

4. **`src/pages/Welcome.jsx`**
   - Updated messaging to remove "Step 1 of 2" language
   - Changed copy to mention "5 free messages per month—no credit card needed"
   - Removed reference to "pick a plan" in the flow description

5. **`src/pages/Subscription.jsx`**
   - **NEW:** Added prominent banner for exhausted free tier users explaining they've used their 5 messages
   - Banner shows clear CTA to upgrade or try web chat
   - Updated page heading and copy based on `exhausted` query parameter
   - Added smooth scroll to plans section

### Modified Files - Backend

6. **`lambdas/users/helpers.py`**
   - **NEW:** Enhanced `get_user_profile()` to fetch and include SMS usage data
   - Returns `smsUsage` object with:
     - `messagesSent`: Current month's message count
     - `periodKey`: Current billing period
     - `messageLimit`: 5 for free tier, null for unlimited
   - Gracefully handles missing SMS usage data (optional field)

## New User Flows

### Before
```
Landing → Auth → Welcome (phone) → Subscription (DROPOFF) → Settings
```

### After - New User with Messages Remaining
```
Landing → Auth → Welcome (phone) → Getting Started (SMS instructions) → [User texts] → Settings/Chat
```

### After - Free User Who Exhausted Messages
```
[User logs in] → Callback detects exhausted → Subscription (with banner) → [Upgrade or try web chat]
```

## Key Features of Getting Started Page

1. **Clear Success State** - Green checkmark and "You're All Set!" message
2. **Prominent Phone Number** - Large, tappable phone number with "Open Messaging App" button
3. **Example Messages** - Shows 4 example texts users can send
4. **How It Works** - Step-by-step explanation of the SMS experience
5. **Free Tier Details** - Clearly shows what's included (5 messages/month, no credit card)
6. **Web Chat Option** - Secondary CTA for users who prefer web interface
7. **Quick Links** - Easy access to settings, plans, and help

## Key Features of Exhausted Free Tier Banner

1. **Prominent Alert** - Orange warning banner with icon explaining situation
2. **Clear Messaging** - "You've Used Your 5 Free Messages This Month"
3. **Two CTAs**:
   - Primary: "View Unlimited Plans" (scroll to plans)
   - Secondary: "Try Web Chat (Free & Unlimited)"
4. **Reassurance** - Mentions free messages reset next month
5. **Context-Aware Page Copy** - Different headlines based on exhaustion state

## Expected Impact

- **Reduced friction** - Users can experience value before being asked to pay
- **Higher activation** - Clear instructions on first action (send a text)
- **Better conversion** - Users who experience the product are more likely to upgrade later
- **Clearer value prop** - SMS as primary product is crystal clear
- **Natural upgrade path** - Users who exhaust free tier are guided to upgrade with context

## Upgrade Trigger Points

Users will naturally upgrade when they:
1. **Exhaust 5 free messages** ✅ (now implemented with banner)
2. Use 4-5 of their free messages (future: add usage warning in settings)
3. See value and want unlimited access
4. Get SMS notification about limit (already implemented in backend)

## Technical Details

### Backend API Changes
The `GET /users` endpoint now returns:
```json
{
  "userId": "...",
  "email": "...",
  "phoneNumber": "+11234567890",
  "isSubscribed": false,
  "plan": "free",
  "smsUsage": {
    "messagesSent": 5,
    "periodKey": "2026-01",
    "messageLimit": 5
  }
}
```

For subscribed users, `messageLimit` is `null` (unlimited).

### Frontend Usage Detection
```javascript
const smsUsage = userData.smsUsage;
if (smsUsage && smsUsage.messagesSent >= smsUsage.messageLimit) {
  // User exhausted free tier
  navigate("/subscription?exhausted=true");
}
```

## Notes

- Free tier enrollment happens automatically in the backend (no frontend changes needed for that)
- Subscription page is still accessible via direct link for users who want to upgrade immediately
- Web chat doesn't count toward SMS limit (good upsell angle)
- SMS usage data is fetched from `sms-usage` DynamoDB table based on phone number
- Usage resets monthly automatically via `periodKey` tracking in backend

