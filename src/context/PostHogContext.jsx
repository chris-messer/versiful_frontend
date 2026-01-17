import { createContext, useContext, useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { useConfig } from '../hooks/useConfig';

const PostHogContext = createContext(null);

export const PostHogProvider = ({ children }) => {
  const { config, loading } = useConfig();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (loading || !config?.posthog?.apiKey) {
      return;
    }

    // Initialize PostHog
    posthog.init(config.posthog.apiKey, {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      // Capture pageviews automatically
      capture_pageview: true,
      capture_pageleave: true,
      // Set environment as a super property
      loaded: (posthog) => {
        // Register environment as super property (included in all events)
        posthog.register({
          environment: config.environment,
          domain: window.location.hostname,
        });
        
        console.log(`📊 PostHog initialized - Environment: ${config.environment}`);
        
        // Check if user marked themselves as internal
        const isInternal = localStorage.getItem('versiful_internal') === 'true';
        
        // Check if running on localhost
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
        
        if (isInternal) {
          posthog.register({
            internal_user: true,
            user_type: 'internal'
          });
          console.log('🔧 Internal user detected - events will be tagged');
        }
        
        if (isLocalhost) {
          posthog.register({
            testing_environment: 'localhost'
          });
        }
        
        // Expose helper to window for easy access in console
        window.markAsInternal = () => {
          posthog.register({ internal_user: true, user_type: 'internal' });
          localStorage.setItem('versiful_internal', 'true');
          console.log('✅ You are now marked as an internal user');
        };
        
        window.unmarkAsInternal = () => {
          posthog.unregister('internal_user');
          posthog.unregister('user_type');
          localStorage.removeItem('versiful_internal');
          console.log('✅ Internal user flag removed');
        };
        
        setIsInitialized(true);
      },
      // Track all environments (dev/staging/prod) with environment filter
      // Filter in PostHog dashboard: environment = 'prod' to see only production
      opt_out_capturing_by_default: false,
    });

    return () => {
      // Clean up on unmount
      posthog.opt_out_capturing();
    };
  }, [config, loading]);

  const value = {
    posthog: isInitialized ? posthog : null,
    isInitialized,
    environment: config?.environment,
  };

  return (
    <PostHogContext.Provider value={value}>
      {children}
    </PostHogContext.Provider>
  );
};

export const usePostHog = () => {
  const context = useContext(PostHogContext);
  if (context === undefined) {
    throw new Error('usePostHog must be used within a PostHogProvider');
  }
  return context;
};

