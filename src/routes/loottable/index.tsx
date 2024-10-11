import { component$ } from '@builder.io/qwik';
// import { SectionTitle } from '~/components/selection-title/SectionTitle';
import { pageWrapper } from '~/styles/pageWrapper';
import { LootStoreContextProvider } from './LootStore';
import { SpecSelector } from './SpecSelector';
import { LootTableMain } from './LootTableMain';
import { css } from 'styled-system/css';

const Main = component$(() => {
  return (
    <section>
      {/* <SectionTitle title="The War Within S1 Mythic+ Loot Table" /> */}

      <SpecSelector />

      <section
        class={css({
          mt: 48,
        })}
      >
        <LootTableMain />
      </section>
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
