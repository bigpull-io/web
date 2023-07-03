import { component$, useContext } from '@builder.io/qwik';
import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

import { Checkbox } from '~/components/inputs/Checkbox';
import { sendEvent } from '~/components/vercel/sendEvent';

import { EditorStoreContext } from './EditorStore';

export const Options = component$(() => {
  const { options } = useContext(EditorStoreContext);

  return (
    <section
      class={css({
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'dark',
        bg: 'background.3',
        p: 8,
        mb: 24,
        rounded: 4,
        flex: '1 1 0%',
      })}
    >
      <h3
        class={css({ mb: 16, textTransform: 'uppercase', fontWeight: 'bold' })}
      >
        Options
      </h3>

      <section
        class={vstack({
          gap: 12,
          alignItems: 'start',
        })}
      >
        <Checkbox
          label="Maximise all crafting resources (Flightstones, crests etc)"
          help="Enables all sim variations even without enough resources"
          checked={options.maximiseCraftingResources}
          onChange$={(value) => {
            options.maximiseCraftingResources = value;
            sendEvent('ChangedOption', {
              option: `maximiseCraftingResources:${value}`,
            });
          }}
        />

        <Checkbox
          label="Only show crafted items with customisable stats"
          help="Hides non-changeable items - more features coming soon!"
          checked={options.showCraftedOnly}
          onChange$={(value) => {
            options.showCraftedOnly = value;
            sendEvent('ChangedOption', {
              option: `showCraftedOnly:${value}`,
            });
          }}
        />
      </section>
    </section>
  );
});
