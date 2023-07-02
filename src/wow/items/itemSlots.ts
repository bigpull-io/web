export const itemSlots = [
  'head',
  'neck',
  'shoulder',
  'back',
  'chest',
  'tabard',
  'shirt',
  'wrist',
  'hands',
  'waist',
  'legs',
  'feet',
  'finger1',
  'finger2',
  'trinket1',
  'trinket2',
  'main_hand',
  'off_hand',
] as const;

export type ItemSlot = (typeof itemSlots)[number];
