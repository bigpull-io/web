import { Slot, component$ } from '@builder.io/qwik';
import { css, cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import { WoWImage } from '~/components/image/WoWImage';

import { type Item } from './Item';
import { itemToWowheadUrl } from './itemToWowheadUrl';

interface ItemComponentProps {
  styles?: string;
  item: Item;
}

export const itemContainerStyles = css({
  p: 8,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'darkBorder',
  bg: 'background.2',
  rounded: 4,
  position: 'relative',
});

export const ItemComponent = component$<ItemComponentProps>(
  ({ styles, item }) => (
    <div class={cx(styles, itemContainerStyles)}>
      <a
        href={itemToWowheadUrl(item)}
        target="_blank"
        class={flex({ alignItems: 'center' })}
      >
        <WoWImage
          type="item"
          id={item.id}
          alt={item.name}
          size={36}
          styles={css({
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: `itemQuality.${item.quality}`,
            mr: 8,
          })}
        />
        <div class={css({ mt: -4 })}>
          <span class={css({ color: `itemQuality.${item.quality}` })}>
            {item.name}
          </span>
          <p
            class={css({
              textTransform: 'uppercase',
              fontSize: 12,
              fontWeight: 'bold',
            })}
          >
            <span class={css({ color: 'white', mr: 2 })}>{item.ilvl}</span>{' '}
            {!!item.upgradeTrack && (
              <span
                class={css({
                  color: 'gold',
                })}
              >
                {item.upgradeTrack.name} {item.upgradeTrack.current}/
                {item.upgradeTrack.max}
              </span>
            )}
            {!!item.crafting_quality && (
              <WoWImage
                type="craft-rank"
                id={item.crafting_quality}
                alt={`Rank ${item.crafting_quality}`}
                size={16}
                styles={css({
                  display: 'inline-block',
                  verticalAlign: 'text-top',
                })}
              />
            )}
          </p>
          <Slot name="subtitle" />
        </div>
      </a>

      <section>
        <section
          class={css({
            mt: { base: 12, _empty: 0 },
          })}
        >
          <Slot />
        </section>

        <div
          class={css({
            width: '100%',
            textAlign: 'right',
            transform: 'translate(9px, 9px)',
          })}
        >
          <Slot name="label" />
        </div>
      </section>
    </div>
  )
);
