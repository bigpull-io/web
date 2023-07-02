import { defineConfig } from '@pandacss/dev';

const itemQuality = {
  poor: '#9d9d9d',
  uncommon: '#ffffff',
  common: '#1eff00',
  rare: '#0070dd',
  epic: '#a335ee',
  legendary: '#ff8000',
  artifact: '#e6cc80',
  heirloom: '#00ccff',
};

const classes = {
  deathknight: '#c41e3a',
  demonhunter: '#a330c9',
  druid: '#ff7c0a',
  evoker: '#33937f',
  hunter: '#aad372',
  mage: '#3fc7eb',
  monk: '#00ff98',
  paladin: '#f48cba',
  priest: '#ffffff',
  rogue: '#fff468',
  shaman: '#0070dd',
  warlock: '#8788ee',
  warrior: '#c69b6d',
};

const toColorMap = (obj: Record<string, string>) =>
  Object.entries(obj).reduce((acc, [name, value]) => {
    acc[name] = { value };

    return acc;
  }, {});

const toNames = (prefix: string, obj: Record<string, string>) =>
  Object.keys(obj).map((key) => `${prefix}.${key}`);

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        background: {
          1: { value: '#111' },
          2: { value: 'rgb(21, 23, 24)' },
          3: { value: 'rgb(32, 36, 37)' },
        },

        primary: { value: '#00ff98' },
        link: { value: '#00ff98' },
        linkHovered: { value: '#00b16a' },
        white: { value: '#ecedee' },
        grey: { value: '#9ba1a6' },
        dark: { value: 'rgb(32, 36, 37)' },
        darkBorder: { value: '#555' },
        gold: { value: '#ffd100' },
        itemQuality: toColorMap(itemQuality),
        classes: toColorMap(classes),
      },
    },
  },

  staticCss: {
    css: [
      {
        properties: {
          color: [
            ...toNames('classes', classes),
            ...toNames('itemQuality', itemQuality),
          ],
          borderColor: [
            ...toNames('classes', classes),
            ...toNames('itemQuality', itemQuality),
          ],
        },
      },
    ],
  },

  // The output directory for your css system
  outdir: 'styled-system',

  emitPackage: true,

  jsxFramework: 'qwik',

  globalCss: {
    html: {
      lineHeight: 1.5,
      textRendering: 'optimizeLegibility',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      WebkitTextSizeAdjust: '100%',
      height: '100%',
    },
    body: {
      height: 'fit-content',
      minHeight: '100%',
      maxHeight: '100%',
      backgroundColor: 'background.1',
      color: 'white',
      _before: {
        content: '""',
        width: '100%',
        height: '100%',
        bottom: 0,
        left: 0,
        position: 'fixed',
        zIndex: -1,
      },
    },
    a: {
      color: 'link',
      _hover: {
        color: 'linkHovered',
      },
    },
    textarea: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'darkBorder',
      background: 'background.3',
      color: 'white',
      padding: 8,
    },
  },
});
