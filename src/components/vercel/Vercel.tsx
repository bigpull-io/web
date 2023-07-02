import { inject } from '@vercel/analytics';
import { component$, useVisibleTask$ } from '@builder.io/qwik';

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
