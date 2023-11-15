import { component$ } from '@builder.io/qwik';
import { css } from 'styled-system/css';
import { token } from 'styled-system/tokens';

export type StatId = 'haste' | 'crit' | 'vers' | 'mastery';

interface StatLabelProps {
  statId: StatId;
}

const options: Record<StatId, { label: string }> = {
  haste: {
    label: 'Haste',
  },
  crit: {
    label: 'Critical Strike',
  },
  vers: {
    label: 'Versatility',
  },
  mastery: {
    label: 'Mastery',
  },
};

export const StatLabel = component$<StatLabelProps>(({ statId }) => {
  const opts = options[statId];

  if (!opts) {
    return null;
  }

  return (
    <span
      class={css({
        display: 'inline-block',
        px: 8,
        mr: 8,
        borderRadius: 4,
        userSelect: 'none',
        // bg: 'var(--bg)',
        border: '1px solid var(--c)',
        color: 'var(--c)',
      })}
      style={{
        '--c': token(`colors.stats.${statId}` as any),
      }}
    >
      {opts.label}
    </span>
  );
});
