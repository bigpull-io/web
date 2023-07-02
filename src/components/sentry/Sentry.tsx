import { component$, useVisibleTask$ } from '@builder.io/qwik';
import * as sdk from '@sentry/browser';

const isEnabled = import.meta.env.PROD;

export const Sentry = component$(() => {
  useVisibleTask$(() => {
    if (!isEnabled) {
      return;
    }

    sdk.init({
      environment: import.meta.env.PROD ? 'production' : 'development',
      release: import.meta.env.APP_VERSION,
      allowUrls: ['https://www.bigpull.io/'],
    });
  });

  return null;
});
