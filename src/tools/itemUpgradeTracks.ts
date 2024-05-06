import { writeFile } from 'node:fs/promises';

const url = `https://www.raidbots.com/static/data/live/bonuses.json?_t=${Date.now()}`;

interface UpgradeTrack {
  max: number;
  levels: string[];
}

(async () => {
  const upgradeTracks: Record<string, UpgradeTrack> = {};

  console.log('[ITEM UPGRADES] Fetching...');
  const resp = await fetch(url);
  const data = await resp.json();

  console.log('[ITEM UPGRADES] Generating data...');

  Object.entries(data).forEach(([id, obj]: [string, any]) => {
    if (!obj.upgrade?.group || !obj.upgrade?.name) {
      return;
    }

    const groupId = obj.upgrade.group;
    const name = obj.upgrade.name;

    upgradeTracks[groupId] = upgradeTracks[groupId] ?? {
      name,
      max: obj.upgrade.max,
      levels: [],
    };

    upgradeTracks[groupId].levels[obj.upgrade.level - 1] = id;
  });

  console.log('[ITEM UPGRADES] Writing to file...');

  await writeFile(
    './src/data/item-upgrade-tracks.json',
    JSON.stringify(upgradeTracks)
  );

  console.log('[ITEM UPGRADES] Done!');
})();
