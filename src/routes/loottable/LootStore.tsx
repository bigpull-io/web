import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';

import items from '~/data/mplus-loot.json';

interface LootStore {
  selectedSpec: string | undefined;
  items: typeof items;
}

export const LootStoreContext =
  createContextId<LootStore>('bigpull.loot.store');

export const LootStoreContextProvider = component$(() => {
  const store = useStore<LootStore>(
    {
      selectedSpec: undefined,
      items,
    },
    { deep: true }
  );

  useContextProvider(LootStoreContext, store);

  return <Slot />;
});
