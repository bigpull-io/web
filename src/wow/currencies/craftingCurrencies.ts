interface CraftingCurrency {
  type: 'currency' | 'item';
  name: string;
}

export const craftingCurrencies: Record<string, CraftingCurrency> = {
  // '1792': {
  //   type: 'currency',
  //   name: 'Honor',
  // },
  // '2122': {
  //   type: 'currency',
  //   name: 'Storm Sigil',
  // },
  '2245': {
    type: 'currency',
    name: 'Flightstones',
  },

  // '190453': {
  //   type: 'item',
  //   name: 'Spark of Ingenuity',
  // },
  '204440': {
    type: 'item',
    name: 'Spark of Shadowflame',
  },

  '204193': {
    type: 'item',
    name: `Whelpling's Shadowflame Crest`,
  },
  '204195': {
    type: 'item',
    name: `Drake's Shadowflame Crest`,
  },
  '204196': {
    type: 'item',
    name: `Wyrm's Shadowflame Crest`,
  },
  '204194': {
    type: 'item',
    name: `Aspect's Shadowflame Crest`,
  },
};
