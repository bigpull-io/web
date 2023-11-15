import { component$, useContext, useSignal } from '@builder.io/qwik';
import { LootStoreContext } from './LootStore';
import specs from '~/data/specs.json';
import { css } from 'styled-system/css';
import { token } from 'styled-system/tokens';
import { Popover } from '~/components/inputs/Popover';
import { SpecLabel } from './SpecLabel';
import { Title } from '~/components/title/Title';

const specGroups = specs
  .reduce((acc, spec) => {
    if (!acc.includes(spec.class)) {
      acc.push(spec.class);
    }

    return acc;
  }, [] as string[])
  .sort((a, b) => a.localeCompare(b))
  .map((cls) => ({
    name: cls,
    specs: specs
      .filter((spec) => spec.class === cls)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));

export const SpecSelector = component$(() => {
  const ctx = useContext(LootStoreContext);
  const isOpen = useSignal(false);

  return (
    <Popover isOpen={isOpen}>
      <span q:slot="title">
        <Title
          size="big"
          class={css({
            mb: 8,
          })}
        >
          Select specialisation
        </Title>
      </span>

      <span q:slot="label">
        {ctx.selectedSpec ? <SpecLabel id={ctx.selectedSpec} /> : 'All specs'}
      </span>

      <div
        class={css({
          columnCount: 2,
          p: 8,
        })}
      >
        {specGroups.map((group) => (
          <div
            key={group.name}
            class={css({
              mb: 16,
              breakInside: 'avoid',
            })}
          >
            {group.specs.map((spec) => (
              <div
                key={spec.id}
                class={css({
                  display: 'inline-block',
                  py: 8,
                  px: 8,
                  mr: 8,
                  borderRadius: 4,
                  userSelect: 'none',
                  cursor: 'pointer',
                  color: 'var(--c)',
                  bg: 'var(--bg)',
                  _hover: {
                    bg: 'var(--bgh)',
                  },
                  fontWeight: 'var(--fw)',
                })}
                style={
                  ctx.selectedSpec === spec.id
                    ? {
                        '--bg': token('colors.link'),
                        '--bgh': token('colors.linkHovered'),
                        '--c': token('colors.background.2'),
                        '--fw': 'bold',
                      }
                    : {
                        '--bgh': token('colors.background.2'),
                        '--c': token(`colors.classes.${spec.class}` as any),
                      }
                }
                onClick$={() => {
                  ctx.selectedSpec = spec.id;
                  isOpen.value = false;
                }}
              >
                <SpecLabel id={spec.id} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Popover>
  );
});
