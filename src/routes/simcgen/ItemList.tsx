import { component$, useContext } from '@builder.io/qwik';
import { SectionTitle } from '~/components/selection-title/SectionTitle';
import { css, cx } from 'styled-system/css';
import { flex, vstack, wrap } from 'styled-system/patterns';
import { type ItemSlot } from '~/wow/items/itemSlots';
import { EditorStoreContext } from './EditorStore';
import { EditableItem } from './EditableItem';
import { Checkbox } from '~/components/inputs/Checkbox';
import { CharacterInfo } from './CharacterInfo';
import { sendEvent } from '~/components/vercel/sendEvent';

const itemSlotToLabel = (slot: ItemSlot) => {
  if (slot.startsWith('finger')) {
    return 'Ring';
  }

  if (slot.startsWith('trinket')) {
    return 'Trinket';
  }

  return slot
    .replace(/_/g, ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

const itemStyles = css({ width: '32.64%' });

interface SlotItemsProps {
  itemSlots: ItemSlot[];
}

const SlotItems = component$<SlotItemsProps>(({ itemSlots }) => {
  const {
    equippedItems,
    bagItems,
    options: { showCraftedOnly },
  } = useContext(EditorStoreContext);

  const items = {
    equipped: itemSlots
      .map((slot) => equippedItems[slot])
      .filter(Boolean)
      .filter((item) => !showCraftedOnly || item.crafted_stat_ids.length),
    bag: itemSlots
      .map((slot) => bagItems[slot])
      .filter(Boolean)
      .flat()
      .filter((item) => !showCraftedOnly || item.crafted_stat_ids.length),
  };

  if (!items.equipped.length && !items.bag.length) {
    return null;
  }

  return (
    <section
      class={css({
        mb: 32,
      })}
    >
      <h3
        class={css({
          fontSize: 24,
          mb: 8,
        })}
      >
        {itemSlotToLabel(itemSlots[0])}
      </h3>

      <section class={cx(wrap({ flexDirection: 'row', gap: '12px' }), css({}))}>
        {items.equipped.map((item) => (
          <EditableItem
            key={JSON.stringify(item)}
            item={item}
            equipped
            styles={itemStyles}
          />
        ))}
        {items.bag
          .sort((a, b) => b.ilvl - a.ilvl)
          .map((item) => (
            <EditableItem
              key={JSON.stringify(item)}
              item={item}
              styles={itemStyles}
            />
          ))}
      </section>
    </section>
  );
});

const Options = component$(() => {
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
              option: 'maximiseCraftingResources',
              value,
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
              option: 'showCraftedOnly',
              value,
            });
          }}
        />
      </section>
    </section>
  );
});

const slotsToDisplay: ItemSlot[][] = [
  ['head'],
  ['neck'],
  ['shoulder'],
  ['back'],
  ['chest'],
  ['wrist'],
  ['hands'],
  ['waist'],
  ['legs'],
  ['feet'],
  ['finger1', 'finger2'],
  ['trinket1', 'trinket2'],
  ['main_hand'],
  ['off_hand'],
];

export const ItemList = component$(() => {
  return (
    <section>
      <SectionTitle title="2. Enhance your data">
        Clone crafted gear with different stat variations and more
      </SectionTitle>

      <section
        class={cx(
          flex({
            gap: 32,
            alignItems: 'start',
            justifyContent: 'space-between',
            width: '100%',
          }),
          css({ mb: 40 })
        )}
      >
        <Options />
        <CharacterInfo />
      </section>

      <section class={vstack({ gap: '12px', alignItems: 'stretch' })}>
        {slotsToDisplay.map((slots, i) => (
          <SlotItems key={i} itemSlots={slots} />
        ))}
      </section>
    </section>
  );
});
