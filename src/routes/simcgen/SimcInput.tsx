import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { css } from 'styled-system/css';
import { simcParser } from './simcParser';
import { EditorStoreContext } from './EditorStore';
import { SectionTitle } from '~/components/selection-title/SectionTitle';

export const SimcInput = component$(() => {
  const store = useContext(EditorStoreContext);

  useVisibleTask$(({ track }) => {
    track(() => store.input);

    try {
      const { character, craftingCurrencies, equippedItems, bagItems } =
        simcParser(store.input);

      store.character = character;
      store.craftingCurrencies = craftingCurrencies;
      store.equippedItems = equippedItems;
      store.bagItems = bagItems;

      // setTimeout(() => {
      store.currentStep = 'item-list';
      // }, 1000);
    } catch (e) {
      // @TODO: display error
      console.error('ERROR', e);
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
