import qualities from '~/data/item-qualities.json';

import { type Item } from './Item';
import { type ItemQuality } from './ItemQuality';

export const getItemQuality = (item: Item): ItemQuality => {
  // Parse from bonus ids
  for (const [quality, ids] of Object.entries(qualities)) {
    if (ids.some((id) => item.bonus_ids?.includes(id))) {
      return quality as ItemQuality;
    }
  }

  // Crafted -> epic
  if (item.crafting_quality) {
    return 'epic';
  }

  // Fall back to rare when no bonus ids
  if (!item.bonus_ids.length) {
    return 'rare';
  }

  // Default to epic :()
  return 'epic';
};
