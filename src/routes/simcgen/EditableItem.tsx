import { component$ } from '@builder.io/qwik';
import { css, cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import { type Item } from '~/wow/items/Item';
import { ItemComponent } from '~/wow/items/ItemComponent';

// 8836/8840/8902/8960/9405/8846/9365
const bonuses = {
  'Crit Haste': '8790',
  'Crit Mast': '8791',
  'Crit Vers': '8795',
  'Haste Mast': '8793',
  'Haste Vers': '8792',
  'Mast Vers': '8794',
};

interface EditableItemProps {
  item: Item;
  equipped?: boolean;
  styles?: string;
}

const equippedStyles = css({
  borderColor: 'gold!important',
  borderWidth: 2,
});

export const EditableItem = component$<EditableItemProps>(
  ({ item, equipped, styles }) => {
    return (
      <ItemComponent
        item={item}
        styles={cx(styles, equipped && equippedStyles)}
      >
        {!!equipped && (
          <span
            q:slot="label"
            class={css({
              bg: 'gold',
              color: 'dark',
              textTransform: 'uppercase',
              fontSize: 12,
              fontWeight: 'bold',
              rounded: 4,
              px: 8,
              py: 2,
            })}
          >
            Equipped
          </span>
        )}

        {!!item.crafted_stat_ids.length && (
          <section>
            <p
              class={css({
                textTransform: 'uppercase',
                fontSize: 12,
                fontWeight: 'bold',
                mb: 4,
              })}
            >
              Crafted stats
            </p>
            <section class={flex({ gap: 4 })}>
              {Object.entries(bonuses).map(([name, id]) => (
                <label key={name} class={css({ flex: '1 0 0' })}>
                  <input
                    type="checkbox"
                    checked={item.bonus_ids?.includes(id)}
                    disabled={item.bonus_ids?.includes(id)}
                    class={css({
                      display: 'none',
                      _checked: {
                        '& + div': {
                          backgroundColor: 'itemQuality.epic',
                        },
                      },
                      _disabled: {
                        '& + div': {
                          backgroundColor: 'gold',
                          color: 'dark',
                          cursor: 'not-allowed',
                        },
                      },
                    })}
                  />
                  <div
                    key={name}
                    class={css({
                      backgroundColor: 'dark',
                      rounded: 4,
                      textAlign: 'center',
                      py: 8,
                      cursor: 'pointer',
                      userSelect: 'none',
                      fontSize: 12,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    })}
                  >
                    {name}
                  </div>
                </label>
              ))}
            </section>
          </section>
        )}
      </ItemComponent>
    );
  }
);
