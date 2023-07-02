import { component$, useContext } from '@builder.io/qwik';
import { pageWrapper } from '~/styles/pageWrapper';
import { EditorStoreContext, EditorStoreContextProvider } from './EditorStore';
import { SimcInput } from './SimcInput';
// import { CharacterWithItems } from './CharacterWithItems';
import { vstack } from 'styled-system/patterns';
import { ItemList } from './ItemList';

const Main = component$(() => {
  const { currentStep } = useContext(EditorStoreContext);

  return (
    <section class={vstack({ gap: '48px', alignItems: 'stretch' })}>
      {currentStep === 'simc-input' && <SimcInput />}
      {currentStep === 'item-list' && <ItemList />}
      {/* {currentStep === 'item-list' && <CharacterWithItems />} */}
    </section>
  );
});

export const SimcGen = component$(() => {
  return (
    <section class={pageWrapper()}>
      <EditorStoreContextProvider>
        <Main />
      </EditorStoreContextProvider>
    </section>
  );
});
