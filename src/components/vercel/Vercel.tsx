import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { inject } from '@vercel/analytics';

const isEnabled = import.meta.env.PROD;

export const Vercel = component$(() => {
  useVisibleTask$(() => {
    if (!isEnabled) {
      return;
    }

    inject();
  });

  return null;
});
