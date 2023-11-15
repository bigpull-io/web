import { component$ } from '@builder.io/qwik';
import { SectionTitle } from '~/components/selection-title/SectionTitle';
import { pageWrapper } from '~/styles/pageWrapper';
import { LootStoreContextProvider } from './LootStore';
import { vstack } from 'styled-system/patterns';
import { SpecSelector } from './SpecSelector';
import { LootTableMain } from './LootTableMain';

const Main = component$(() => {
  return (
    <section class={vstack({ gap: '48px', alignItems: 'stretch' })}>
      <SectionTitle title="Dragonflight S3 Mythic+ Loot" />
      <SpecSelector />
      <LootTableMain />
    </section>
  );
});

export const LootTable = component$(() => {
  return (
    <section class={pageWrapper()}>
      <LootStoreContextProvider>
        <Main />
      </LootStoreContextProvider>
    </section>
  );
});
