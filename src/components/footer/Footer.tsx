import { component$ } from '@builder.io/qwik';
import { useServerTimeLoader } from '~/routes/layout';
import { css } from 'styled-system/css';

export const Footer = component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div class={css({ textAlign: 'center', pt: 60, pb: 16, fontSize: 14 })}>
        <span>Made with ♡ by BigPull.io</span>
        <span class={css({ px: 16 })}>|</span>
        <span>{serverTime.value.date}</span>
      </div>
    </footer>
  );
});
