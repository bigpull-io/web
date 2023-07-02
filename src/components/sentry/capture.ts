import * as sdk from '@sentry/browser';

const isEnabled = import.meta.env.PROD;

export const captureMessage: typeof sdk.captureMessage = (...args) => {
  if (!isEnabled) {
    console.log('[MESSAGE]', args);
    return '';
  }

  return sdk.captureMessage(...args);
};

export const captureException: typeof sdk.captureException = (...args) => {
  if (!isEnabled) {
    console.log('[EXCEPTION]', args);
    return '';
  }

  return sdk.captureException(...args);
};
export const addBreadcrumb: typeof sdk.addBreadcrumb = (...args) => {
  if (!isEnabled) {
    console.log('[BREADCRUMB]', args);
    return '';
  }

  return sdk.addBreadcrumb(...args);
};
