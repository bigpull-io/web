import { component$, useContext } from '@builder.io/qwik';
import { EditorStoreContext } from './EditorStore';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import { ItemComponent } from '~/wow/items/ItemComponent';
import { SectionTitle } from '~/components/selection-title/SectionTitle';
import { CharacterInfo } from './CharacterInfo';

interface ItemSlotProps {
  slot: string;
}

const ItemSlot = component$<ItemSlotProps>(({ slot }) => {
  const { equippedItems } = useContext(EditorStoreContext);
  const item = equippedItems[slot];

  if (!item) {
    return null;
  }

  return (
    <ItemComponent
      key={slot}
      item={item}
      styles={css({ width: '100%', mb: 16 })}
    />
  );
});

export const CharacterWithItems = component$(() => {
  return (
    <section>
      <SectionTitle title="3. Character info">
        Character info and equipped items
      </SectionTitle>

      <section class={flex({ gap: '34px' })}>
        <section class={css({ flex: '0 0 340px' })}>
          <ItemSlot slot="head" />
          <ItemSlot slot="neck" />
          <ItemSlot slot="shoulder" />
          <ItemSlot slot="back" />
          <ItemSlot slot="chest" />
          <ItemSlot slot="shirt" />
          <ItemSlot slot="tabard" />
          <ItemSlot slot="wrist" />
          <ItemSlot slot="main_hand" />
          <ItemSlot slot="off_hand" />
        </section>
        <section class={css({ flex: '1 1 0%' })}>
          <CharacterInfo />
        </section>
        <section class={css({ flex: '0 0 340px' })}>
          <ItemSlot slot="hands" />
          <ItemSlot slot="waist" />
          <ItemSlot slot="legs" />
          <ItemSlot slot="feet" />
          <ItemSlot slot="finger1" />
          <ItemSlot slot="finger2" />
          <ItemSlot slot="trinket1" />
          <ItemSlot slot="trinket2" />
        </section>
      </section>
    </section>
  );
});
