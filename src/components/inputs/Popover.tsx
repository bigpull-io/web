import { component$, Slot, type Signal } from '@builder.io/qwik';
import type { JSX } from '@builder.io/qwik/jsx-runtime';
import { css } from 'styled-system/css';

interface PopoverProps {
  title?: string;
  label?: string | JSX.Element;
  isOpen: Signal<boolean>;
}

export const Popover = component$<PopoverProps>(({ title, label, isOpen }) => {
  // const isOpen = useSignal(false);

  return (
    <label>
      {title ? (
        <span
          class={css({
            display: 'block',
          })}
        >
          {title}
        </span>
      ) : (
        <Slot name="title" />
      )}

      <div
        class={css({
          display: 'inline-block',
          px: 8,
          py: 4,
          bg: 'background.2',
          color: 'primary',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'primary',
          borderRadius: 4,
          cursor: 'pointer',
        })}
        onClick$={() => {
          isOpen.value = true;
        }}
      >
        {label ?? <Slot name="label" />}
      </div>

      {isOpen.value && (
        <div
          class={css({
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'darkBorder',
            borderRadius: 4,
            bg: 'background.0',
          })}
        >
          <Slot />
        </div>
      )}
    </label>
  );
});
