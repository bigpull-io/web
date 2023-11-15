import { component$ } from '@builder.io/qwik';
import { WoWImage } from '~/components/image/WoWImage';
import { css } from 'styled-system/css';
import specs from '~/data/specs.json';

interface SpecLabelProps {
  id: string;
}

export const SpecLabel = component$<SpecLabelProps>(({ id }) => {
  const spec = specs.find((s) => s.id === id);

  if (!spec) {
    return null;
  }

  return (
    <div>
      <WoWImage
        type="class-spec"
        id={spec.icon}
        alt={spec.name}
        size={24}
        styles={css({
          display: 'inline-block',
          verticalAlign: 'text-top',
          mr: 8,
          borderRadius: '50%',
        })}
      />
      {spec.name}
    </div>
  );
});
