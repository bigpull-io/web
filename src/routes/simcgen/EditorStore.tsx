import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';

import { sendEvent } from '~/components/vercel/sendEvent';
import { type Item } from '~/wow/items/Item';

// import { mockInput } from './mock';

interface EditorStore {
  input: string;
  output: string;
  character: Record<string, string>;
  upgradeCurrencies: Record<string, number>;
  equippedItems: Record<string, Item>;
  bagItems: Record<string, Item[]>;
  options: {
    maximiseUpgradeCurrencies: boolean;
    showCraftedOnly: boolean;
  };
  currentStep: 'simc-input' | 'item-list';
}

export const EditorStoreContext = createContextId<EditorStore>(
  'bigpull.editor.store'
);

export const EditorStoreContextProvider = component$(() => {
  const store = useStore<EditorStore>(
    {
      // input: mockInput,
      input: '',
      output: '',
      character: {},
      upgradeCurrencies: {},
      equippedItems: {},
      bagItems: {},

      options: {
        maximiseUpgradeCurrencies: false,
        showCraftedOnly: false,
      },
      currentStep: 'simc-input',
    },
    { deep: true }
  );

  useVisibleTask$(({ track }) => {
    const currentStep = track(() => store.currentStep);

    if (currentStep !== 'simc-input') {
      sendEvent('ChangedStep', {
        step: currentStep,
      });
    }
  });

  useVisibleTask$(({ track }) => {
    const stringifiedOptions = track(() => JSON.stringify(store.options));

    try {
      window.localStorage.setItem('options', stringifiedOptions);
    } catch {
      // Nothing to do here
    }
  });

  useContextProvider(EditorStoreContext, store);

  return <Slot />;
});
