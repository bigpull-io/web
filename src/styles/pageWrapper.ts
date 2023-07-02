import { cva } from 'styled-system/css';

export const pageWrapper = cva({
  base: {
    width: '100%',
    maxWidth: 1200,
    paddingX: 16,
    marginX: 'auto',
  },
});
