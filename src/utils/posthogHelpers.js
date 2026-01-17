/**
 * PostHog helper utilities for user identification and filtering
 */

/**
 * Identify a user in PostHog with their full profile
 * Call this when user data is loaded (login, registration, etc.)
 * 
 * @param {Object} posthog - PostHog instance
 * @param {Object} userData - User data from backend
 * @param {string} userData.userId - Cognito user ID (used as distinct_id)
 * @param {string} userData.email - User email
 * @param {string} [userData.phoneNumber] - User phone (E.164 format)
 * @param {string} [userData.firstName] - User first name
 * @param {string} [userData.lastName] - User last name
 * @param {boolean} [userData.isSubscribed] - Subscription status
 * @param {string} [userData.plan] - Subscription plan (free/monthly/annual)
 * @param {string} [userData.bibleVersion] - Preferred Bible version
 * @param {string} [userData.responseStyle] - Preferred response style
 */
export const identifyUser = (posthog, userData) => {
  if (!posthog || !userData || !userData.userId) {
    console.warn('PostHog: Missing posthog instance or user data');
    return;
  }
  
  // Build person properties from available user data
  const personProperties = {
    email: userData.email,
    is_subscribed: userData.isSubscribed || false,
    plan: userData.plan || 'free',
  };
  
  // Add optional properties if available
  if (userData.phoneNumber) personProperties.phone_number = userData.phoneNumber;
  if (userData.firstName) personProperties.first_name = userData.firstName;
  if (userData.lastName) personProperties.last_name = userData.lastName;
  if (userData.bibleVersion) personProperties.bible_version = userData.bibleVersion;
  if (userData.responseStyle) personProperties.response_style = userData.responseStyle;
  
  // Identify user with Cognito userId as distinct_id
  posthog.identify(userData.userId, personProperties);
  
  console.log('✅ PostHog: User identified -', userData.email);
};

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

