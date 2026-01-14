# PostHog Internal User Marker

## Mark Yourself as Internal (Run Once Per Browser)

Open browser console on `https://versiful.io` and paste:

```javascript
// Mark yourself as internal user
window.posthog.register({ internal_user: true, user_type: 'internal' });
localStorage.setItem('versiful_internal', 'true');
console.log('✅ You are now marked as an internal user. All future events will be tagged.');
```

## Unmark Yourself

```javascript
// Remove internal user flag
window.posthog.unregister('internal_user');
window.posthog.unregister('user_type');
localStorage.removeItem('versiful_internal');
console.log('✅ Internal user flag removed.');
```

## Stop All Tracking (Per Browser)

```javascript
// Completely opt out of tracking
window.posthog.opt_out_capturing();
console.log('🚫 Tracking disabled for this browser.');
```

## Resume Tracking

```javascript
// Re-enable tracking
window.posthog.opt_in_capturing();
console.log('✅ Tracking re-enabled.');
```

---

## Filter in PostHog Dashboard

### To Exclude Internal Users:

1. Go to any PostHog insight/dashboard
2. Click **"Add filter"**
3. Select property: **`internal_user`**
4. Set condition: **`is not set`** or **`≠ true`**
5. Save

### To ONLY See Internal Users (for testing):

1. Add filter
2. Property: **`internal_user`**
3. Condition: **`= true`**

---

## Alternative: Filter by IP Address

PostHog can also filter by IP address:

1. Go to **PostHog Settings** → **Project Settings**
2. Scroll to **"Filter out internal and test users"**
3. Add your IP address(es)
4. Click **"Save"**

Find your IP: https://www.whatismyip.com

---

## Bookmarklet (Optional - Advanced)

Create a bookmark with this URL to toggle internal user mode with one click:

```javascript
javascript:(function(){if(localStorage.getItem('versiful_internal')==='true'){window.posthog.unregister('internal_user');localStorage.removeItem('versiful_internal');alert('Internal mode OFF');}else{window.posthog.register({internal_user:true});localStorage.setItem('versiful_internal','true');alert('Internal mode ON');}})();
```

### How to use bookmarklet:
1. Create a new bookmark
2. Name it "Toggle Versiful Internal"
3. Paste the JavaScript code above as the URL
4. Click it when on versiful.io to toggle

