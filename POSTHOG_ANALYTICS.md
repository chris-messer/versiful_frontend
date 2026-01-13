# PostHog Analytics Setup

## Overview

PostHog analytics is integrated into the Versiful frontend to track user behavior and product usage. The setup is environment-aware and configured to only track production by default.

## Architecture

### Backend (Terraform)

1. **API Key Storage**: PostHog API key is stored in environment-specific `.tfvars` files
   - `terraform/dev.tfvars`
   - `terraform/staging.tfvars`
   - `terraform/prod.tfvars`

2. **Config Generation**: The S3 module generates `config.json` with the PostHog API key and deploys it to S3

3. **Public Access**: The `config.json` file is publicly accessible (this is safe - see Security section)

### Frontend (React)

1. **PostHogProvider**: Wraps the entire app and initializes PostHog with config from `config.json`
2. **usePostHog Hook**: Provides access to PostHog instance throughout the app
3. **Auto-tracking**: Pageviews and pageleaves are automatically captured

## Environment Configuration

### Current Setup

By default, PostHog is configured to:
- ✅ **Track production** (`opt_out_capturing_by_default: false` when `environment === 'prod'`)
- ❌ **Skip dev/staging** (`opt_out_capturing_by_default: true` when `environment !== 'prod'`)

All environments use the **same PostHog project**, but events are tagged with the `environment` property for filtering.

### To Enable Tracking in Dev/Staging

Edit `/src/context/PostHogContext.jsx`:

```javascript
// Change this line:
opt_out_capturing_by_default: config.environment !== 'prod',

// To this (to always track):
opt_out_capturing_by_default: false,

// Or this (to only track staging and prod):
opt_out_capturing_by_default: config.environment === 'dev',
```

## Usage Examples

### Basic Event Tracking

```javascript
import { usePostHog } from '../context/PostHogContext';

function MyComponent() {
  const { posthog } = usePostHog();

  const handleClick = () => {
    if (posthog) {
      posthog.capture('button_clicked', {
        button_name: 'subscribe',
        location: 'home_page'
      });
    }
  };

  return <button onClick={handleClick}>Subscribe</button>;
}
```

### Identifying Users

```javascript
import { usePostHog } from '../context/PostHogContext';
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { posthog } = usePostHog();
  const { user } = useAuth();

  useEffect(() => {
    if (posthog && user) {
      // Identify user with their unique ID
      posthog.identify(user.sub, {
        email: user.email,
        phone: user.phone,
        subscription_status: user.subscriptionStatus
      });
    }
  }, [posthog, user]);

  return <div>Welcome!</div>;
}
```

### Feature Flags (Future)

```javascript
import { usePostHog } from '../context/PostHogContext';

function MyComponent() {
  const { posthog } = usePostHog();
  const [showNewFeature, setShowNewFeature] = useState(false);

  useEffect(() => {
    if (posthog) {
      posthog.onFeatureFlags(() => {
        setShowNewFeature(posthog.isFeatureEnabled('new-chat-interface'));
      });
    }
  }, [posthog]);

  return showNewFeature ? <NewChatUI /> : <OldChatUI />;
}
```

## Common Events to Track

Consider tracking these key events:

### User Actions
- `user_signed_up` - New user registration
- `user_signed_in` - User login
- `user_signed_out` - User logout
- `subscription_started` - User started subscription
- `subscription_cancelled` - User cancelled subscription

### Feature Usage
- `chat_message_sent` - User sent a message
- `bible_verse_requested` - User requested a verse
- `settings_updated` - User changed settings
- `vcard_downloaded` - User downloaded contact card

### Page-specific Events
- `landing_page_cta_clicked` - CTA button clicked on landing page
- `pricing_viewed` - User viewed pricing
- `help_article_viewed` - User viewed help content

## Filtering by Environment in PostHog

1. Go to your PostHog dashboard
2. Use the filter: `environment = prod` to see only production events
3. Create saved insights/dashboards filtered by environment

## Security

### Is the API Key Safe to Expose?

**Yes!** The PostHog Project API Key (starts with `phc_...`) is designed to be public:
- ✅ It's write-only for events
- ✅ Cannot read data from PostHog
- ✅ Cannot modify project settings
- ✅ Similar to Google Analytics IDs or Stripe publishable keys

### Additional Protection

If desired, you can enable in PostHog dashboard:
1. **Domain allowlist** - Only accept events from your domains
2. **Rate limiting** - Prevent abuse

## Deployment

PostHog configuration is deployed automatically via Terraform:

```bash
cd terraform

# Deploy to dev
terraform apply -var-file=dev.tfvars

# Deploy to staging
terraform apply -var-file=staging.tfvars

# Deploy to prod
terraform apply -var-file=prod.tfvars
```

The `config.json` with PostHog API key will be automatically updated on S3.

## Troubleshooting

### PostHog not tracking

1. Check browser console for errors
2. Verify `config.json` is loading: `https://dev.versiful.io/config.json`
3. Check that environment is not opted out
4. Verify API key is correct in `.tfvars` file
5. Check network tab for requests to `https://us.i.posthog.com`

### Events not showing in dashboard

1. Check environment filter in PostHog
2. Wait a few seconds - events can take time to appear
3. Verify user hasn't opted out of tracking
4. Check that `opt_out_capturing_by_default` is set correctly

## Best Practices

1. **Always check if posthog exists** before calling methods:
   ```javascript
   if (posthog) {
     posthog.capture('event');
   }
   ```

2. **Use descriptive event names** with snake_case:
   - ✅ `subscription_started`
   - ❌ `sub_start`

3. **Add meaningful properties** to events:
   ```javascript
   posthog.capture('button_clicked', {
     button_text: 'Sign Up',
     page: 'landing',
     section: 'hero'
   });
   ```

4. **Respect user privacy**:
   - Don't track sensitive data (passwords, payment details)
   - Honor opt-out preferences
   - Include in Privacy Policy

5. **Test in dev first** before deploying tracking to production

## References

- [PostHog JavaScript Documentation](https://posthog.com/docs/libraries/js)
- [PostHog React Integration](https://posthog.com/docs/libraries/react)
- [PostHog Best Practices](https://posthog.com/docs/integrate/client/js#best-practices)

