import { component$, useContext, useSignal } from '@builder.io/qwik';
import { LootStoreContext } from './LootStore';
import { SectionTitle } from '~/components/selection-title/SectionTitle';
import { ItemComponent } from '~/wow/items/ItemComponent';
import { type StatId, StatLabel } from '~/wow/statlabel/StatLabel';
import type { ItemSlot } from '~/wow/items/itemSlots';
import { css } from 'styled-system/css';
import { Title } from '~/components/title/Title';

const slotOrder: { label: string; slots: ItemSlot[] }[] = [
  { label: 'Head', slots: ['head'] },
  { label: 'Neck', slots: ['neck'] },
  { label: 'Shoulder', slots: ['shoulder'] },
  { label: 'Back', slots: ['back'] },
  { label: 'Chest', slots: ['chest'] },
  { label: 'Wrist', slots: ['wrist'] },
  { label: 'Hands', slots: ['hands'] },
  { label: 'Waist', slots: ['waist'] },
  { label: 'Legs', slots: ['legs'] },
  { label: 'Feet', slots: ['feet'] },
  { label: 'Rings', slots: ['finger1'] },
  { label: 'Trinkets', slots: ['trinket1'] },
  { label: 'Weapons', slots: ['main_hand', 'off_hand'] },
];

export const LootTablePerDungeon = component$(() => {
  const { items: allItems } = useContext(LootStoreContext);
  const itemsByDungeon = useSignal(() => {
    const map = new Map<string, any[]>();

    allItems.forEach((item) => {
      const dungeon = item.dungeon;
      if (!map.has(dungeon)) {
        map.set(dungeon, []);
      }
      map.get(dungeon)!.push(item);
    });

    return map;
  });

  const dungeonsWithLoot = Array.from(itemsByDungeon.value.entries())
    .filter(([, items]) => !!items.length)
    .sort(([dungeonA], [dungeonB]) => dungeonA.localeCompare(dungeonB));

  return (
    <>
      <section>
        <SectionTitle title="Dungeons" />

        <ul
          class={css({
            listStyle: 'square',
            ml: 42,
          })}
        >
          {dungeonsWithLoot.map(([dungeon]) => (
            <li key={dungeon}>
              <a href={`#${encodeURIComponent(dungeon)}`}>{dungeon}</a>
            </li>
          ))}
        </ul>
      </section>

      {dungeonsWithLoot.map(([dungeon, items]) => (
        <section key={dungeon} id={encodeURIComponent(dungeon)}>
          <SectionTitle key={dungeon} title={dungeon} />
          {slotOrder
            .filter(({ slots }) =>
              items.some((item) => slots.includes(item.slot))
            )
            .map(({ label, slots }) => (
              <div key={label}>
                <Title
                  size="big"
                  class={css({
                    mt: 36,
                    mb: 12,
                  })}
                >
                  {label}
                </Title>

                {items
                  .filter((item) => slots.includes(item.slot))
                  .map((item) => (
                    <ItemComponent
                      key={item.id}
                      item={{
                        ...item,
                        quality: 'epic',
                      }}
                      styles={css({
                        display: 'inline-block',
                        mr: 8,
                        mb: 8,
                      })}
                    >
                      <span q:slot="subtitle">{item.slot}</span>
                      {item.stats.map((stat: StatId) => (
                        <StatLabel key={stat} statId={stat} />
                      ))}
                    </ItemComponent>
                  ))}
              </div>
            ))}
        </section>
      ))}
    </>
  );
});
