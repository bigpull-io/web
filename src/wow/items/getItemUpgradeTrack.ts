import upgradeTracks from '~/data/item-upgrade-tracks.json';
import { type Item } from './Item';
import { type ItemUpgradeTrack } from './ItemUpgradeTrack';

export const getItemUpgradeTrack = (item: Item) => {
  for (const [name, track] of Object.entries(upgradeTracks)) {
    for (const levelId of track.levels) {
      if (item.bonus_ids?.includes(levelId)) {
        return {
          name,
          max: track.max,
          current: track.levels.indexOf(levelId) + 1,
        } as ItemUpgradeTrack;
      }
    }
  }
};
