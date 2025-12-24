import { useState, useEffect } from 'react';

/**
 * Hook to fetch environment configuration from /config.json
 * Provides phone numbers and other environment-specific values
 */
export const useConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/config.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.status}`);
        }
        const data = await response.json();
        setConfig(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching config:', err);
        setError(err.message);
        // Fallback to default values
        setConfig({
          environment: 'dev',
          phone: {
            e164: '+18336811158',
            display: '(833) 681-1158',
            sms: '833-681-1158'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
};

