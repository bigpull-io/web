import { type ItemQuality } from './ItemQuality';
import { type ItemUpgradeTrack } from './ItemUpgradeTrack';

export interface Item {
  id: string;
  name: string;
  ilvl: number;
  enchant_id?: string;
  bonus_ids: string[];
  gem_ids: string[];
  crafted_stat_ids: string[];
  crafting_quality?: string;
  quality: ItemQuality;
  upgradeTrack?: ItemUpgradeTrack;
}
