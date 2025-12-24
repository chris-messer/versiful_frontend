# Twilio Toll-Free Verification with BRN Requirements
## Complete Submission Form (Updated December 2025)

**Date:** December 24, 2025  
**Toll-Free Number:** 833-681-1158  
**Service:** Versiful SMS/MMS Program

---

## STEP 1: BUSINESS IDENTITY & CLASSIFICATION

### Business Registration Number (BRN) Fields

| Field | Value |
|-------|-------|
| **Business Name** | Versiful LLC |
| **Doing Business As (DBA)** | Versiful |
| **Business Type** | `PRIVATE_PROFIT` (or `SOLE_PROPRIETOR` if applicable) |
| **Business Registration Number** | [YOUR EIN HERE] |
| **Business Registration Authority** | `EIN` (Employer Identification Number) |
| **Issuing Country** | United States |

**Note:** If you're operating as a sole proprietor with no employees:
- Set `businessType` to `SOLE_PROPRIETOR`
- You can indicate "No EIN - Sole Proprietor" in the BRN field

---

## STEP 2: MESSAGING USE CASE

### Basic Information

| Field | Value |
|-------|-------|
| **Estimated Monthly Volume** | 100 messages (adjust as needed) |
| **Opt-In Type** | Web Form |
| **Messaging Use Case Category** | Customer Care |

### Use Case Description

```
Versiful provides biblical guidance and wisdom via SMS to users who register 
through our website at https://versiful.io. Users opt in during registration 
by checking an explicit consent checkbox, acknowledging carrier charges and 
opt-out instructions. They text questions and receive personalized scripture-based 
responses. We send welcome messages upon registration, subscription confirmations, 
and respond to user-initiated text conversations. All messaging complies with 
TCPA/CTIA requirements including STOP/START/HELP keywords.
```

### Proof of Consent (Opt-In) URL

```
https://versiful.io/opt-in-form
```

**What this page shows:**
- Exact replica of the registration form users see
- Required SMS consent checkbox with carrier charge acknowledgment
- Age certification (18+) requirement
- Clear STOP opt-out instructions
- Message frequency disclosure

---

## STEP 3: OPT-IN & MESSAGING FLOWS

### Opt-In Keywords
```
N/A
```
**Explanation:** Users opt in via web form checkbox, not by texting a keyword.

### Opt-In Confirmation Message

```
Welcome to Versiful! 🙏

You have 5 free messages per month. Text us anytime for biblical guidance and wisdom.

Want unlimited messages? Subscribe at https://versiful.io

Tap the contact card to save Versiful to your contacts!
```

### Help Message Response

```
VERSIFUL HELP 📖

Text us your questions or what you're facing, and we'll respond with biblical guidance.

COMMANDS:
• STOP - Unsubscribe from messages
• START - Resubscribe to messages
• HELP - Show this help message

SUPPORT:
Visit: https://versiful.io
Email: support@versiful.io
Text: 833-681-1158

Message & data rates may apply.
```

**Note:** Email address should be `support@versiful.io` (not .com)

---

## STEP 4: SAMPLE MESSAGES

### Sample Message #1 (Welcome)
```
Welcome to Versiful, [Name]! 🙏

You have 5 free messages per month. Text us anytime for biblical guidance and wisdom.

Want unlimited messages? Subscribe at https://versiful.io

Tap the contact card to save Versiful to your contacts!
```

### Sample Message #2 (Response to User Question)
```
Thank you for your question. Here's what Scripture says:

"Cast all your anxiety on him because he cares for you." - 1 Peter 5:7 (NIV)

In times of worry, remember that God invites us to bring our burdens to Him. 
He cares deeply about what concerns you.
```

### Sample Message #3 (Subscription Confirmation)
```
Thank you for subscribing to Versiful! 🎉

You now have unlimited messages. Text us anytime for guidance, wisdom, and 
comfort from Scripture.

We're honored to walk with you on your spiritual journey.
```

---

## STEP 5: POLICIES & COMPLIANCE

### Privacy Policy URL
```
https://versiful.io/privacy
```

### Terms and Conditions URL
```
https://versiful.io/terms
```

### Age-Gated Content
```
true
```
**Explanation:** Users must certify they are 18+ during registration. An explicit age 
consent checkbox is required before form submission at https://versiful.io/opt-in-form

---

## STEP 6: CONTACT & SUPPORT

### E-mail for Notifications
```
support@versiful.io
```
**Purpose:** Twilio will send verification status updates to this address.

### Business Address
```
[Your business address here]
```

### Support Contact Information
- **Phone:** 833-681-1158 (SMS/MMS only, no voice)
- **Email:** support@versiful.io
- **Website:** https://versiful.io

---

## STEP 7: ADDITIONAL INFORMATION (OPTIONAL FIELD)

```
COMPLIANCE SUMMARY:

✅ TCPA/CTIA Compliance:
- Explicit web-form opt-in with checkbox consent
- All STOP/START/HELP keywords implemented and tested
- Carrier charge acknowledgment in registration form
- Age-gated service (18+ requirement)
- One-time opt-in confirmation message sent

✅ STI-PA/ITG Compliance:
- Versiful is the originator of all messages
- Full traceback cooperation commitment
- Compliance statement: https://versiful.io/traceback-compliance

✅ Message Frequency:
- Free: 5 messages/month
- Starter: 40 messages/month  
- Premium: Unlimited
- Users select plan after registration

✅ STOP Implementation:
- Immediately cancels active subscriptions via Stripe API
- Sets user optedOut=true in database
- Sends confirmation message
- No further messages sent unless user texts START

✅ Data Privacy:
- GDPR/CCPA compliant
- Cookie consent banner
- Privacy policy and terms publicly accessible

All documentation publicly available at provided URLs.
```

---

## COMPLETE URL REFERENCE

Provide these URLs in your Twilio verification form:

| Document | URL | Public Access |
|----------|-----|---------------|
| **Opt-In Form (REQUIRED)** | `https://versiful.io/opt-in-form` | ✅ Yes, no login required |
| **SMS Consent Details** | `https://versiful.io/sms-consent` | ✅ Yes, no login required |
| **Privacy Policy** | `https://versiful.io/privacy` | ✅ Yes, no login required |
| **Terms of Service** | `https://versiful.io/terms` | ✅ Yes, no login required |
| **Traceback Compliance** | `https://versiful.io/traceback-compliance` | ✅ Yes, no login required |

---

## IMPORTANT NOTES FOR TWILIO REVIEWERS

### Why Previous Verification May Have Failed

The previous submission likely linked to `/sms-consent`, which explains the legal 
requirements but does not show the **actual opt-in form** where users provide 
consent. Twilio needs to see:

1. ✅ The exact form interface users interact with
2. ✅ The specific consent checkbox language
3. ✅ How carrier charges are disclosed
4. ✅ Where STOP instructions appear
5. ✅ Age certification requirement

**Solution:** We've created `/opt-in-form` which displays the exact registration 
form with all required consent elements clearly visible.

### Key Compliance Features

1. **Two Required Checkboxes:**
   - SMS consent with carrier charge acknowledgment
   - Age certification (18+)
   - Form cannot be submitted without both

2. **Clear Opt-Out:**
   - STOP instructions in consent text
   - STOP command cancels subscriptions automatically
   - Confirmation message sent
   - Full keyword support (STOP, START, HELP)

3. **No Surprise Charges:**
   - Users explicitly acknowledge carrier charges
   - Links to terms and privacy policy in form
   - Message frequency disclosed by plan tier

4. **Verified Business:**
   - EIN provided (or marked as sole proprietor)
   - Legal business name matches registration
   - US-based business with proper documentation

---

## DEPLOYMENT CHECKLIST

Before submitting to Twilio, ensure:

- [ ] `/opt-in-form` page deployed to production
- [ ] All URLs resolve correctly (no 404s)
- [ ] Privacy policy is public and complete
- [ ] Terms of service are public and complete
- [ ] Traceback compliance page is accessible
- [ ] EIN or business registration number ready
- [ ] Support email monitored regularly
- [ ] STOP/START/HELP commands tested and working

---

## SUBMISSION TIMELINE

**New BRN Requirements:**
- **Now - February 16, 2026:** BRN fields are **optional**
- **February 17, 2026 onwards:** BRN fields are **mandatory**

**Recommendation:** Submit with BRN information NOW to avoid delays and strengthen 
your application, even though it's currently optional.

---

## AFTER APPROVAL

Once your toll-free number is verified:

1. **Monitor Deliverability:** Watch for carrier blocks or filtering
2. **Track Opt-Outs:** Review STOP rate to gauge user satisfaction
3. **Update Documentation:** Keep URLs current if legal pages change
4. **Annual Review:** Twilio may re-verify periodically

---

**Prepared By:** AI Assistant  
**Last Updated:** December 24, 2025  
**Status:** Ready for Twilio submission ✅

**Next Steps:**
1. Fill in your EIN (or mark as sole proprietor)
2. Deploy the new `/opt-in-form` page to production
3. Verify all URLs are accessible
4. Submit to Twilio using the information above

