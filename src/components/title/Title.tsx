import { cva } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const titleStyles = cva({
  variants: {
    size: {
      large: {
        fontSize: 32,
      },
      big: {
        fontSize: 22,
      },
    },
  },
});

export const Title = styled('h2', titleStyles);
