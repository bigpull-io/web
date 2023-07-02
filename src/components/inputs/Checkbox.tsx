import { component$ } from '@builder.io/qwik';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

interface CheckboxProps {
  label: string;
  help?: string;
  checked: boolean;
  onChange$: (value: boolean) => void;
}

export const Checkbox = component$<CheckboxProps>(
  ({ label, help, checked, onChange$ }) => {
    return (
      <label class={css({ cursor: 'pointer', userSelect: 'none' })}>
        <section class={flex({ alignItems: 'center' })}>
          <input
            type="checkbox"
            checked={checked}
            onChange$={(e) => {
              onChange$(e.target.checked);
            }}
            class={css({
              display: 'none',
              '&:checked + span': {
                bg: 'primary',
                boxShadow: `0px 0px 0px 3px #000 inset`,
              },
            })}
          />
          <span
            class={css({
              width: 20,
              height: 20,
              minWidth: 20,
              minHeight: 20,
              mr: 12,

              background: 'background.2',
              color: 'primary',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'primary',
            })}
          />

          {label}
        </section>

        {help && <p class={css({ color: 'grey', ml: 32 })}>{help}</p>}
      </label>
    );
  }
);
