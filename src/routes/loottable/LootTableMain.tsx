import { component$, useContext } from '@builder.io/qwik';
import { LootStoreContext } from './LootStore';
import { LootTablePerDungeon } from './LootTablePerDungeon';
import { LootTableForSpec } from './LootTableForSpec';

export const LootTableMain = component$(() => {
  const { selectedSpec } = useContext(LootStoreContext);

  if (!selectedSpec) {
    return <LootTablePerDungeon />;
  }

  return <LootTableForSpec />;
});
