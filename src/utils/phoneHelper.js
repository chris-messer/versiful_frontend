// Helper to get phone number from config for documentation pages
// These pages may render before config loads, so we provide fallbacks

export const getPhoneNumber = (config, format = 'sms') => {
  if (!config?.phone) {
    return '833-681-1158'; // Default fallback
  }
  
  switch (format) {
    case 'e164':
      return config.phone.e164 || '+18336811158';
    case 'display':
      return config.phone.display || '(833) 681-1158';
    case 'sms':
    default:
      return config.phone.sms || '833-681-1158';
  }
};

