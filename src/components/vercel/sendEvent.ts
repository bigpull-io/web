import { track } from '@vercel/analytics';

const isEnabled = import.meta.env.PROD;

export const sendEvent: typeof track = (...args) => {
  if (!isEnabled) {
    console.log('[EVENT]', args);
    return '';
  }

  track(...args);
};
