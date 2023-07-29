import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { css } from 'styled-system/css';

import { SectionTitle } from '~/components/selection-title/SectionTitle';
import { captureException } from '~/components/sentry/capture';

import { EditorStoreContext } from './EditorStore';
import { simcParser } from './simcParser';

export const SimcInput = component$(() => {
  const store = useContext(EditorStoreContext);

  useVisibleTask$(({ track }) => {
    track(() => store.input);

    try {
      const { character, upgradeCurrencies, equippedItems, bagItems } =
        simcParser(store.input);

      store.character = character;
      store.upgradeCurrencies = upgradeCurrencies;
      store.equippedItems = equippedItems;
      store.bagItems = bagItems;

      if (character.name) {
        store.currentStep = 'item-list';
      }
    } catch (e) {
      // @TODO: display error
      captureException(e);
    }
  });

  return (
    <section>
      <SectionTitle title="1. SimC Input">
        Paste the text from the{' '}
        <a
          href="https://medium.com/raidbots/how-to-install-and-use-the-simulationcraft-addon-5b64d0835a0b"
          target="_blank"
        >
          SimulationCraft addon
        </a>
      </SectionTitle>

      <textarea
        class={css({
          width: '100%',
          height: '200px',
          fontFamily: 'monospace',
        })}
        placeholder="Copy the simc export here!"
        onInput$={(e) => {
          store.input = (e.target as HTMLTextAreaElement).value;
        }}
        value={store.input}
      />
    </section>
  );
});
