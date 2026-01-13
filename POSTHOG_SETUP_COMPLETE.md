# PostHog Analytics - Setup Complete ✅

## What Was Done

### Backend (Terraform)
1. ✅ Added `posthog_apikey` variable to `terraform/variables.tf`
2. ✅ Passed PostHog API key to S3 module in `terraform/main.tf`
3. ✅ Updated S3 module to include PostHog in `config.json` generation
4. ✅ Added PostHog API key to all environment tfvars:
   - `terraform/dev.tfvars`
   - `terraform/staging.tfvars`
   - `terraform/prod.tfvars`

### Frontend (React)
1. ✅ Installed `posthog-js` package
2. ✅ Created `PostHogProvider` context in `src/context/PostHogContext.jsx`
3. ✅ Integrated PostHogProvider into `App.jsx`
4. ✅ Created documentation in `POSTHOG_ANALYTICS.md`
5. ✅ Created usage examples in `src/utils/posthogExample.js`

## Current Configuration

### Tracking Behavior
- **Production**: ✅ Tracking enabled by default
- **Staging**: ❌ Tracking disabled by default (can be enabled manually)
- **Dev**: ❌ Tracking disabled by default (can be enabled manually)

### Environment Separation
All environments use the **same PostHog project** but events are tagged with:
```javascript
{
  environment: 'dev' | 'staging' | 'prod'
}
```

You can filter by environment in PostHog dashboard.

## Next Steps

### 1. Deploy to Dev (Test First)
```bash
cd terraform
terraform apply -var-file=dev.tfvars
```

This will:
- Update `config.json` on S3 with PostHog API key
- The frontend will automatically pick it up on next deployment

### 2. Deploy Frontend
The frontend code is already ready! Just deploy as normal:
```bash
cd ../versiful-frontend
npm run build
# Deploy dist/ to S3 (your normal process)
```

### 3. Test Locally (Optional)
To test PostHog locally:
1. Start your dev server: `npm run dev`
2. Open browser console
3. Enable tracking temporarily in console:
   ```javascript
   window.posthog.opt_in_capturing()
   ```
4. Navigate around and check PostHog dashboard for events

### 4. Verify in PostHog Dashboard
1. Go to your PostHog project
2. Click "Events" to see live events
3. Filter by `environment = dev` to see test events
4. Should see automatic pageview events

### 5. Add Custom Tracking
Use the examples in `src/utils/posthogExample.js` to add tracking to important actions:
- User sign ups
- Subscription starts/cancellations
- Chat messages sent
- Key button clicks

Example:
```javascript
import { usePostHog } from '../context/PostHogContext';

function MyComponent() {
  const { posthog } = usePostHog();
  
  const handleImportantAction = () => {
    if (posthog) {
      posthog.capture('important_action', {
        action_type: 'subscription_started'
      });
    }
  };
  
  return <button onClick={handleImportantAction}>Subscribe</button>;
}
```

### 6. Deploy to Staging & Prod
Once tested in dev:
```bash
# Staging
terraform apply -var-file=staging.tfvars

# Production
terraform apply -var-file=prod.tfvars
```

## How to Enable Tracking in Dev/Staging

If you want to track dev/staging events, edit `src/context/PostHogContext.jsx`:

```javascript
// Current (only prod tracked):
opt_out_capturing_by_default: config.environment !== 'prod',

// Change to (track all environments):
opt_out_capturing_by_default: false,

// Or (track staging and prod):
opt_out_capturing_by_default: config.environment === 'dev',
```

## Security Note

The PostHog API key in `config.json` is **public and safe**:
- ✅ It's designed for client-side use
- ✅ Write-only for events
- ✅ Cannot read data or modify settings
- ✅ Like Google Analytics or Stripe publishable keys

## Documentation

See `POSTHOG_ANALYTICS.md` for:
- Complete usage guide
- More examples
- Best practices
- Troubleshooting

## Questions?

- To track different environments separately → Create 3 PostHog projects with different API keys
- To disable tracking in specific pages → Check environment in component
- To identify users → Use `posthog.identify(userId, properties)`
- To track feature usage → Use `posthog.capture('event_name', properties)`

---

**You're all set!** 🎉 Deploy when ready and start tracking your users.

