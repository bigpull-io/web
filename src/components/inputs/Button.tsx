import { Slot, component$, type QwikIntrinsicElements } from '@builder.io/qwik';
import { css } from 'styled-system/css';

type ButtonProps = QwikIntrinsicElements['button'];

export const Button = component$<ButtonProps>((args) => (
  <button
    type="button"
    {...args}
    class={css({
      paddingX: 12,
      paddingY: 8,
      background: 'primary',
      color: 'dark',
      fontWeight: 'bold',
      cursor: 'pointer',
    })}
  >
    <Slot />
  </button>
));
