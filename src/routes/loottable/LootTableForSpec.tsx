import { component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { LootStoreContext } from './LootStore';
import type { ItemSlot } from '~/wow/items/itemSlots';
import { css } from 'styled-system/css';
import { itemToWowheadUrl } from '~/wow/items/itemToWowheadUrl';
import { WoWImage } from '~/components/image/WoWImage';

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

const shortenDungeon = (s: string) => s.replace('Dawn of the Infinite', 'DOTI');

export const LootTableForSpec = component$(() => {
  const { selectedSpec, items: allItems } = useContext(LootStoreContext);
  const lootTable = useSignal<Record<string, Record<string, typeof allItems>>>(
    [] as any
  );
  const dungeons = Array.from(
    new Set(
      allItems
        .map((item) => item.dungeon)
        .sort(([dungeonA], [dungeonB]) => dungeonA.localeCompare(dungeonB))
    )
  );

  useTask$(({ track }) => {
    track(() => selectedSpec);

    lootTable.value = slotOrder.reduce(
      (acc, { label, slots }) => {
        acc[label] = dungeons.reduce(
          (acc, dungeon) => {
            acc[dungeon] = allItems.filter(
              (item) =>
                item.dungeon === dungeon &&
                (!item.specs || item.specs.includes(Number(selectedSpec))) &&
                slots.includes(item.slot as any)
            );
            return acc;
          },
          {} as Record<string, typeof allItems>
        );

        return acc;
      },
      {} as Record<string, Record<string, typeof allItems>>
    );
  });

  return (
    <>
      <table
        class={css({
          borderCollapse: 'collapse',
        })}
      >
        <thead>
          <tr>
            <th>&nbsp;</th>
            {dungeons.map((dungeon) => (
              <th
                key={dungeon}
                class={css({
                  maxWidth: 137,
                  width: 137,
                  textWrap: 'balance',
                  verticalAlign: 'top',
                  textTransform: 'uppercase',
                  fontSize: 12,
                  fontWeight: 'bold',
                })}
              >
                {shortenDungeon(dungeon)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody
          class={css({
            verticalAlign: 'top',
          })}
        >
          {slotOrder.map(({ label }) => (
            <tr key={label}>
              <td
                class={css({
                  borderTopWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'background.3',
                  padding: 2,
                  textTransform: 'uppercase',
                  fontSize: 12,
                  fontWeight: 'bold',
                })}
              >
                {label}
              </td>
              {dungeons.map((dungeon) => (
                <td
                  key={dungeon}
                  class={css({
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'background.3',
                    padding: 2,
                  })}
                >
                  {lootTable.value[label]?.[dungeon].map((item) => (
                    <div key={item.id} class={css({ display: 'inline-block' })}>
                      <a href={itemToWowheadUrl(item.id)} target="_blank">
                        <WoWImage
                          type="item"
                          id={item.id}
                          alt={item.name}
                          size={36}
                          styles={css({
                            borderWidth: 2,
                            borderStyle: 'solid',
                            borderColor: 'itemQuality.epic',
                            m: 4,
                          })}
                        />
                      </a>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <section>
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
                      {item.stats.map((stat) => (
                        <StatLabel key={stat} statId={stat} />
                      ))}
                    </ItemComponent>
                  ))}
              </div>
            ))}
        </section>
      ))} */}
    </>
  );
});
