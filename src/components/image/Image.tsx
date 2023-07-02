import { component$ } from '@builder.io/qwik';
import { css, cx } from 'styled-system/css';

export interface ImageProps {
  src: string;
  alt?: string;
  size: number;
  styles?: string;
}

export const Image = component$<ImageProps>(({ src, alt, size, styles }) => (
  <img
    src={src}
    loading="lazy"
    alt={alt}
    width={size}
    height={size}
    class={cx(
      styles,
      css({
        minWidth: size,
        minHeight: size,
      })
    )}
  />
));
