import { component$ } from '@builder.io/qwik';
import { css } from 'styled-system/css';

export const Footer = component$(() => {
  return (
    <footer>
      <div class={css({ textAlign: 'center', pt: 60, pb: 16, fontSize: 14 })}>
        <span>Made with ♡ by BigPull.io</span>
        <span class={css({ px: 16 })}>|</span>
        <span>{import.meta.env.APP_VERSION}</span>
      </div>
    </footer>
  );
});
