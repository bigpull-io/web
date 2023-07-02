import { component$, useVisibleTask$ } from '@builder.io/qwik';
import * as sdk from '@sentry/browser';

const isEnabled = import.meta.env.PROD;

export const Sentry = component$(() => {
  useVisibleTask$(() => {
    if (!isEnabled) {
      return;
    }

    sdk.init({
      dsn: 'https://09cf6de6f97a417c82382297997e9deb@o4505460801798144.ingest.sentry.io/4505460804943872',
      environment: import.meta.env.PROD ? 'production' : 'development',
      release: import.meta.env.APP_VERSION,
      allowUrls: ['https://www.bigpull.io/'],
    });
  });

  return null;
});
