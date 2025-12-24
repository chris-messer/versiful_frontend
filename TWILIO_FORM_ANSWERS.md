# TWILIO VERIFICATION FORM - COPY/PASTE ANSWERS
## Quick Reference Guide

---

## BUSINESS INFORMATION

### Business Name
```
Versiful LLC
```

### Doing Business As (DBA)
```
Versiful
```

### Business Type
Select: **PRIVATE_PROFIT** (or **SOLE_PROPRIETOR** if you have no EIN)

### Business Registration Number
```
[YOUR EIN HERE - e.g., 12-3456789]
```
OR if sole proprietor with no employees:
```
N/A - Sole Proprietor
```

### Business Registration Authority
Select: **EIN** (Employer Identification Number)

### Issuing Country
Select: **United States**

---

## MESSAGING USE CASE

### Estimated Monthly Volume
```
100
```

### Opt-In Type
Select: **Web Form**

### Messaging Use Case Category
Select: **Customer Care**

### Use Case Description
```
Versiful provides biblical guidance and wisdom via SMS to users who register through our website at https://versiful.io. Users opt in during registration by checking an explicit consent checkbox, acknowledging carrier charges and opt-out instructions. They text questions and receive personalized scripture-based responses. We send welcome messages upon registration, subscription confirmations, and respond to user-initiated text conversations. All messaging complies with TCPA/CTIA requirements including STOP/START/HELP keywords.
```

### Proof of Consent (Opt-In) Collected ⭐ KEY FIELD
```
https://versiful.io/opt-in-form
```

---

## SAMPLE MESSAGES

### Sample Message
```
Welcome to Versiful! 🙏

You have 5 free messages per month. Text us anytime for biblical guidance and wisdom.

Want unlimited messages? Subscribe at https://versiful.io

Tap the contact card to save Versiful to your contacts!
```

---

## CONTACT INFORMATION

### E-mail for Notifications
```
support@versiful.io
```

---

## OPT-IN & MESSAGING FLOWS (Optional but Recommended)

### Opt-In Keywords
```
N/A - Users opt in via web form checkbox, not by texting keywords
```

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

---

## POLICIES & COMPLIANCE (Optional but Recommended)

### Privacy Policy URL
```
https://versiful.io/privacy
```

### Terms and Conditions URL
```
https://versiful.io/terms
```

### Age-Gated Content
Select: **true** (Yes)

---

## ADDITIONAL INFORMATION (Optional but Recommended)

```
COMPLIANCE SUMMARY:

✅ TCPA/CTIA: Explicit web-form opt-in with checkbox consent. All STOP/START/HELP keywords implemented. Carrier charges acknowledged in registration form. Age-gated service (18+ required).

✅ STI-PA/ITG: Versiful is originator of all messages. Full traceback cooperation: https://versiful.io/traceback-compliance

✅ Message Frequency: Free (5/mo), Starter (40/mo), Premium (unlimited). Users select plan after registration.

✅ STOP Implementation: Immediately cancels subscriptions via Stripe API, sets optedOut=true, sends confirmation, no further messages unless user texts START.

✅ Data Privacy: GDPR/CCPA compliant with cookie consent, privacy policy, and terms publicly accessible.

Opt-in form demonstration: https://versiful.io/opt-in-form
```

---

## CRITICAL CHECKLIST BEFORE SUBMITTING

- [ ] **Deploy the new opt-in form page to production first!**
- [ ] Verify https://versiful.io/opt-in-form is publicly accessible
- [ ] Verify https://versiful.io/privacy loads correctly
- [ ] Verify https://versiful.io/terms loads correctly
- [ ] Verify https://versiful.io/traceback-compliance loads correctly
- [ ] Have your EIN ready (or confirm you're a sole proprietor)
- [ ] Double-check email is support@versiful.io (not .com)

---

## WHY THIS WILL WORK

**Previous Issue:** You likely submitted `/sms-consent` which is a legal disclosure page, NOT the actual form.

**Solution:** The new `/opt-in-form` page shows Twilio reviewers:
1. ✅ The exact form interface users see
2. ✅ The specific consent checkbox with carrier charge acknowledgment
3. ✅ The age certification (18+) requirement
4. ✅ Clear STOP instructions embedded in consent text
5. ✅ Message frequency by plan tier
6. ✅ Links to all legal documentation

This is EXACTLY what they need to verify your opt-in process is compliant.

---

**Ready to Submit!** Just fill in your EIN and copy/paste the fields above. 🚀

