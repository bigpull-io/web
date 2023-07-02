import { Slot, component$ } from '@builder.io/qwik';
import { css } from 'styled-system/css';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle = component$<SectionTitleProps>(({ title }) => (
  <section
    class={css({
      mb: 24,
    })}
  >
    <h2 class={css({ fontSize: 32 })}>{title}</h2>

    <p class={css({ color: 'grey' })}>
      <Slot />
    </p>
  </section>
));
