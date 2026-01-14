# Free Tier Exhaustion Flow - Implementation Summary

## Overview
When a free tier user exhausts their 5 monthly SMS messages, they are automatically redirected to an upgrade page with a clear, contextual banner explaining the situation and providing options.

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ User logs in (has exhausted 5/5 free messages)             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Callback.jsx checks smsUsage.messagesSent >= messageLimit  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼ (exhausted = true)
┌─────────────────────────────────────────────────────────────┐
│ Navigate to /subscription?exhausted=true                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Subscription page shows prominent orange banner             │
│                                                               │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ ⚠️  You've Used Your 5 Free Messages This Month      │   │
│ │                                                         │   │
│ │ Your free tier gives you 5 messages per month. To     │   │
│ │ continue receiving biblical guidance via text,        │   │
│ │ upgrade to unlimited access below.                    │   │
│ │                                                         │   │
│ │ [View Unlimited Plans] [Try Web Chat (Free)]         │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                               │
│ [Monthly Premium Plan]  [Annual Premium Plan]                │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Details

### 1. Backend: Enhanced User Profile Endpoint

**File:** `lambdas/users/helpers.py`

The `get_user_profile()` function now includes SMS usage data:

```python
def get_user_profile(event, headers):
    # ... existing auth code ...
    
    user_data = response["Item"]
    
    # Fetch SMS usage data if user has a phone number
    phone_number = user_data.get("phoneNumber")
    if phone_number:
        usage_response = sms_usage_table.get_item(Key={"phoneNumber": phone_number})
        if "Item" in usage_response:
            usage_data = usage_response["Item"]
            user_data["smsUsage"] = {
                "messagesSent": int(usage_data.get("plan_messages_sent", 0)),
                "periodKey": usage_data.get("periodKey"),
                "messageLimit": 5 if not user_data.get("isSubscribed") else None
            }
    
    return user_data
```

**Response Example:**
```json
{
  "userId": "abc123",
  "email": "user@example.com",
  "phoneNumber": "+11234567890",
  "isSubscribed": false,
  "plan": "free",
  "isRegistered": true,
  "smsUsage": {
    "messagesSent": 5,
    "periodKey": "2026-01",
    "messageLimit": 5
  }
}
```

### 2. Frontend: Smart Routing in Callback

**File:** `src/pages/Callback.jsx`

```javascript
const userData = await userCheckResponse.json();

if (!userData.isRegistered) {
    navigate("/welcome");
} else if (!userData.isSubscribed) {
    // Check if free tier is exhausted
    const smsUsage = userData.smsUsage;
    if (smsUsage && smsUsage.messagesSent >= smsUsage.messageLimit) {
        navigate("/subscription?exhausted=true");
    } else {
        navigate("/getting-started");
    }
} else {
    navigate("/chat");
}
```

### 3. Frontend: Contextual Banner on Subscription Page

**File:** `src/pages/Subscription.jsx`

The banner appears when `?exhausted=true` is in the URL:

```jsx
const isExhausted = new URLSearchParams(window.location.search).get("exhausted") === "true";

{isExhausted && (
  <div className="rounded-xl border border-orange-200 bg-orange-50 px-6 py-5">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center">
        <WarningIcon />
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-bold">You've Used Your 5 Free Messages This Month</h3>
        <p>Your free tier gives you 5 messages per month. To continue receiving biblical 
           guidance via text, upgrade to unlimited access below. Your free messages will 
           reset next month.</p>
        <div className="flex gap-3">
          <a href="#plans">View Unlimited Plans</a>
          <button onClick={() => navigate("/chat")}>Try Web Chat (Free & Unlimited)</button>
        </div>
      </div>
    </div>
  </div>
)}
```

## User Experience

### Scenario 1: User Exhausts Free Tier Mid-Month

1. User signs up and gets 5 free messages
2. User sends 5 SMS messages over 2 weeks
3. User logs out and logs back in
4. **Callback detects:** `messagesSent (5) >= messageLimit (5)`
5. **Result:** Redirected to subscription page with banner
6. User sees clear explanation and can:
   - Upgrade to unlimited SMS
   - Use free web chat instead
   - Wait until next month for reset

### Scenario 2: User Has Messages Remaining

1. User signs up and gets 5 free messages
2. User sends 2 SMS messages
3. User logs out and logs back in
4. **Callback detects:** `messagesSent (2) < messageLimit (5)`
5. **Result:** Directed to Getting Started page (normal flow)

### Scenario 3: User Upgrades

1. User exhausts free tier
2. Sees banner on subscription page
3. Clicks "View Unlimited Plans"
4. Upgrades to Monthly Premium
5. Backend sets `isSubscribed: true`
6. Next login: `messageLimit: null` (unlimited)
7. **Result:** No more exhaustion checks, unlimited access

## Design Decisions

### Why Orange Banner?
- **Yellow** = Warning (not severe)
- **Orange** = Action needed (more urgent than yellow)
- **Red** = Error (too aggressive for upsell)
- Orange strikes the right balance: clear call-to-action without feeling punitive

### Why Two CTAs?
1. **Primary:** "View Unlimited Plans" - Directly addresses the SMS limitation
2. **Secondary:** "Try Web Chat" - Provides immediate alternative (removes frustration)

### Why Check on Login, Not Mid-Session?
- Simpler implementation
- Less intrusive (doesn't interrupt active usage)
- Natural point to check status
- Backend already handles SMS blocking; frontend just guides to upgrade

## Future Enhancements

### Proactive Usage Warnings (Not Yet Implemented)
- Show warning at 4/5 messages: "You have 1 free message remaining this month"
- Add usage indicator in Settings page
- Email notification when approaching limit

### Grace Period (Optional)
- Allow 1-2 extra messages before hard blocking
- Show "You've exceeded your limit by 1 message" banner

### Annual Reset Reminder
- Email users on their reset date: "Your 5 free messages are ready for [Month]!"

## Testing Checklist

- [ ] Backend returns correct `smsUsage` data
- [ ] Callback routes to `/subscription?exhausted=true` when limit reached
- [ ] Banner appears on subscription page with `exhausted=true` param
- [ ] Banner does NOT appear without `exhausted=true` param
- [ ] "View Plans" button scrolls to plans section
- [ ] "Try Web Chat" button navigates to `/chat`
- [ ] Upgraded users don't see banner (messageLimit: null)
- [ ] Usage resets properly next month (periodKey change)

## Metrics to Track

1. **Exhaustion Rate:** % of users who exhaust free tier
2. **Conversion Rate:** % of exhausted users who upgrade
3. **Web Chat Adoption:** % of exhausted users who try web chat
4. **Churn:** % of exhausted users who never return

## Success Criteria

✅ Clear communication about limit  
✅ No confusion about why messages aren't working  
✅ Two clear paths forward (upgrade or web chat)  
✅ Non-punitive tone (emphasize value, not restriction)  
✅ Technical reliability (correct detection & routing)  

---

**Deployed:** 2026-01-14  
**Status:** Ready for production testing

