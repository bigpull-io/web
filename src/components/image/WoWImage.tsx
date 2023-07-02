import { component$ } from '@builder.io/qwik';
import { type ImageProps, Image } from './Image';

interface WowImageProps extends Pick<ImageProps, 'alt' | 'size' | 'styles'> {
  type: 'class-spec' | 'craft-rank' | 'currency' | 'item';
  id: string;
}

export const WoWImage = component$<WowImageProps>(
  ({ type, id, alt, size, styles }) => (
    <Image
      src={`/icons/${type}?id=${id}`}
      alt={alt}
      size={size}
      styles={styles}
    />
  )
);
