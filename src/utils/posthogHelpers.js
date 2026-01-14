/**
 * PostHog helper utilities for filtering internal users
 */

/**
 * Identify an internal/admin user for filtering
 * Call this when an admin/internal user logs in
 */
export const identifyInternalUser = (posthog, userEmail) => {
  if (!posthog) return;
  
  // List of internal/admin emails to mark
  const internalEmails = [
    'christopher.messer@versiful.io',
    'chris@versiful.io',
    'testuser12345@example.com',
    // Add your email(s) here
  ];
  
  const isInternal = internalEmails.some(email => 
    userEmail.toLowerCase().includes(email.toLowerCase())
  );
  
  if (isInternal) {
    // Register a super property that persists across all events
    posthog.register({
      internal_user: true,
      user_type: 'internal'
    });
    
    // Also identify the user
    posthog.identify(userEmail, {
      email: userEmail,
      internal_user: true
    });
    
    console.log('🔧 Identified as internal user - events tagged for filtering');
  }
};

/**
 * Opt out internal users from tracking entirely
 * More aggressive - stops all tracking for internal users
 */
export const optOutInternalUsers = (posthog, userEmail) => {
  if (!posthog) return;
  
  const internalEmails = [
    'christopher.messer@versiful.io',
    'chris@versiful.io',
    'testuser12345@example.com',
  ];
  
  const isInternal = internalEmails.some(email => 
    userEmail.toLowerCase().includes(email.toLowerCase())
  );
  
  if (isInternal) {
    posthog.opt_out_capturing();
    console.log('🚫 Internal user - tracking disabled');
  }
};

/**
 * Check if current user should be tracked
 */
export const shouldTrackUser = (userEmail) => {
  const internalEmails = [
    'christopher.messer@versiful.io',
    'chris@versiful.io',
    'testuser12345@example.com',
  ];
  
  return !internalEmails.some(email => 
    userEmail.toLowerCase().includes(email.toLowerCase())
  );
};

