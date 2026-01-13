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
        posthog.register({
          environment: config.environment,
        });
        setIsInitialized(true);
      },
      // Only enable in production by default
      // You can change this if you want to track dev/staging too
      opt_out_capturing_by_default: config.environment !== 'prod',
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

