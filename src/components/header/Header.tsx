import { component$ } from '@builder.io/qwik';
import { css, cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import { BigPullLogo } from '~/components/logo/BigPullLogo';

import { pageWrapper } from '../../styles/pageWrapper';

export const Header = component$(() => {
  return (
    <header
      class={cx(
        pageWrapper(),
        css({
          mb: 16,
        })
      )}
    >
      <section class={flex({ alignItems: 'center' })}>
        <a href="/" title="Home">
          <BigPullLogo width={150} />
        </a>
        <p class={css({ ml: 32, color: 'grey' })}>
          {/* Enhance your SimulationCraft export before simming! */}
          The War Within S2 Mythic+ Loot Table
        </p>
      </section>
    </header>
  );
});
