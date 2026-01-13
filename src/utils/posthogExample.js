/**
 * Example file showing how to use PostHog analytics in your components
 * 
 * This file can be deleted - it's just for reference
 */

import { usePostHog } from '../context/PostHogContext';
import { useEffect } from 'react';

// Example 1: Track a simple button click
export function SimpleTrackingExample() {
  const { posthog } = usePostHog();

  const handleSubscribeClick = () => {
    if (posthog) {
      posthog.capture('subscribe_button_clicked', {
        location: 'hero_section',
        timestamp: new Date().toISOString()
      });
    }
    
    // Continue with your normal logic
    console.log('User clicked subscribe');
  };

  return (
    <button onClick={handleSubscribeClick}>
      Subscribe Now
    </button>
  );
}

// Example 2: Identify users when they sign in
export function UserIdentificationExample({ user }) {
  const { posthog } = usePostHog();

  useEffect(() => {
    if (posthog && user) {
      // Identify the user with their unique ID
      posthog.identify(user.sub, {
        email: user.email,
        phone: user.phone_number,
        created_at: user.created_at,
        // Add any other relevant user properties
      });
    }
  }, [posthog, user]);

  return <div>Welcome, {user?.email}</div>;
}

// Example 3: Track page-specific events
export function PageTrackingExample() {
  const { posthog } = usePostHog();

  useEffect(() => {
    // Track that user viewed pricing section
    if (posthog) {
      posthog.capture('pricing_section_viewed', {
        page: window.location.pathname,
        referrer: document.referrer
      });
    }
  }, [posthog]);

  return <div>Pricing content...</div>;
}

// Example 4: Track form submissions
export function FormTrackingExample() {
  const { posthog } = usePostHog();

  const handleSubmit = async (formData) => {
    if (posthog) {
      posthog.capture('contact_form_submitted', {
        form_name: 'contact_us',
        has_phone: !!formData.phone,
        has_message: !!formData.message,
        // Don't track actual user data, just metadata
      });
    }

    // Submit form...
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// Example 5: Track feature usage with timing
export function FeatureTimingExample() {
  const { posthog } = usePostHog();

  const handleChatAction = async () => {
    const startTime = Date.now();
    
    try {
      // Perform chat action
      await sendChatMessage();
      
      if (posthog) {
        posthog.capture('chat_message_sent', {
          success: true,
          duration_ms: Date.now() - startTime,
          message_length: 'short', // or 'medium', 'long'
        });
      }
    } catch (error) {
      if (posthog) {
        posthog.capture('chat_message_failed', {
          success: false,
          error: error.message,
          duration_ms: Date.now() - startTime,
        });
      }
    }
  };

  return <button onClick={handleChatAction}>Send</button>;
}

// Example 6: Check environment before tracking dev-only events
export function DevOnlyTrackingExample() {
  const { posthog, environment } = usePostHog();

  const handleDebugAction = () => {
    // Only track debug events in dev/staging
    if (posthog && environment !== 'prod') {
      posthog.capture('debug_action', {
        environment,
        action: 'test_mode_enabled'
      });
    }
  };

  return <button onClick={handleDebugAction}>Debug</button>;
}

// Example 7: Track errors and exceptions
export function ErrorTrackingExample() {
  const { posthog } = usePostHog();

  useEffect(() => {
    const handleError = (error) => {
      if (posthog) {
        posthog.capture('app_error', {
          error_message: error.message,
          error_stack: error.stack,
          page: window.location.pathname,
        });
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [posthog]);

  return <div>App content...</div>;
}

// Example helper function for consistent tracking
export function trackEvent(posthog, eventName, properties = {}) {
  if (!posthog) return;
  
  posthog.capture(eventName, {
    ...properties,
    // Add common properties to all events
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    referrer: document.referrer,
  });
}

// Usage of helper:
export function HelperUsageExample() {
  const { posthog } = usePostHog();

  const handleAction = () => {
    trackEvent(posthog, 'action_performed', {
      action_type: 'button_click',
      button_id: 'main_cta'
    });
  };

  return <button onClick={handleAction}>Take Action</button>;
}

