import { XMLParser } from 'fast-xml-parser';
import PQueue from 'p-queue';
import { writeFile } from 'node:fs/promises';
import type { ItemSlot } from '~/wow/items/itemSlots';
import { readFileSync } from 'node:fs';

const queue = new PQueue({ concurrency: 1 });

const bis = JSON.parse(
  readFileSync('./src/data/mplus-bis.json', 'utf-8')
) as Record<string, Record<'raid' | 'mplus', string[]>>;

/**
 * Run this script at: https://www.wowhead.com/guide/mythic-plus-dungeons/the-war-within-season-1/loot
let ids = {};
for (let table of Array.from(document.querySelectorAll('div[class="wh-center"] > .markup-table-wrapper > table'))) {
    if (table.querySelector('tr').dataset.background !== 'red') continue;
    const links = table.querySelectorAll('a');
    Array.from(links).forEach((link) => {
        const id = link.href.match(/\/item=(\d+)/)?.[1];
        const dungeon = link.parentElement.nextSibling.innerText;
        ids[dungeon] = ids[dungeon] || [];
        ids[dungeon].push(id);
    });
}
console.log(ids);



https://www.wowhead.com/guide/mythic-plus-dungeons/the-war-within-season-3/loot-drops-mounts
let ids = {};
for (let table of Array.from(document.querySelectorAll('div[class="wh-center"] > .markup-table-wrapper > table'))) {
    if (table.querySelector('tr').dataset.background !== 'q4') continue;
    const links = table.querySelectorAll('a');
    Array.from(links).forEach((link) => {
        const id = link.href.match(/\/item=(\d+)/)?.[1];
        if (!id) return;
        const dungeon = link.parentElement.nextSibling.innerText;
        ids[dungeon] = ids[dungeon] || [];
        ids[dungeon].push(id);
    });
}
console.log(ids);
 */

const itemIds = {
  'Tazavesh: Streets of Wonder': [
    '185842',
    '185840',
    '185804',
    '185782',
    '185814',
    '185793',
    '185807',
    '185802',
    '185786',
    '185817',
    '185791',
    '185809',
    '185816',
    '185794',
    '185808',
    '185800',
    '185789',
    '185815',
    '185792',
    '185806',
    '185798',
    '185787',
    '185836',
    '185845',
    '185846',
    '185844',
    '185777',
    '185821',
    '185778',
    '185780',
    '185824',
    '185783',
    '185812',
  ],
  "Tazavesh: So'leah's Gambit": [
    '185820',
    '185813',
    '185795',
    '185799',
    '185788',
    '185797',
    '185801',
    '185790',
    '185796',
    '185805',
    '185785',
    '185776',
    '185803',
    '185784',
    '185818',
    '185823',
    '185841',
    '185819',
    '185810',
    '185779',
    '185822',
  ],
  'Halls of Atonement': [
    '178827',
    '178824',
    '178813',
    '178833',
    '178822',
    '178831',
    '178817',
    '178832',
    '178823',
    '242473',
    '178816',
    '178821',
    '178815',
    '178830',
    '178812',
    '178820',
    '178814',
    '178818',
    '178825',
    '178826',
    '178834',
    '178829',
    '178828',
    '185811',
  ],
  'Priory of the Sacred Flame': [
    '252009',
    '221200',
    '221131',
    '221126',
    '221121',
    '221125',
    '221130',
    '221120',
    '221124',
    '221119',
    '221129',
    '221203',
    '221118',
    '221123',
    '219309',
    '219308',
    '219310',
    '221128',
    '221122',
    '221116',
    '221127',
    '221117',
  ],
  'Operation: Floodgate': [
    '251880',
    '234496',
    '234495',
    '234497',
    '234498',
    '234500',
    '234499',
    '234503',
    '234502',
    '234501',
    '234506',
    '234504',
    '234505',
    '232541',
    '232545',
    '232542',
    '232543',
    '234493',
    '234491',
    '234494',
    '234490',
    '234492',
  ],
  "Eco-Dome Al'dani": [
    '242491',
    '242477',
    '242468',
    '242490',
    '242486',
    '242482',
    '242472',
    '242488',
    '242483',
    '242475',
    '242479',
    '242495',
    '242494',
    '242497',
    '242484',
    '242470',
    '242464',
    '242481',
    '242476',
  ],
  'The Dawnbreaker': [
    '221135',
    '221149',
    '221148',
    '221142',
    '221134',
    '221140',
    '221202',
    '221146',
    '221139',
    '221133',
    '219312',
    '219311',
    '219313',
    '221138',
    '221144',
    '221137',
    '221143',
    '221132',
  ],
  'Ara-Kara, City of Echoes': [
    '221158',
    '221164',
    '221163',
    '221157',
    '221153',
    '221156',
    '221162',
    '221155',
    '221161',
    '221151',
    '219316',
    '219317',
    '219314',
    '221150',
    '221160',
    '221159',
  ],
} as const;

type Dungeon = keyof typeof itemIds;

type Stat = 'haste' | 'mastery' | 'crit' | 'vers';

const slotIdsToSlotName: Record<number, ItemSlot> = {
  1: 'head',
  2: 'neck',
  3: 'shoulder',
  16: 'back',
  5: 'chest',
  9: 'wrist',
  10: 'hands',
  6: 'waist',
  7: 'legs',
  8: 'feet',
  11: 'finger1',
  12: 'trinket1',
  13: 'main_hand', // one hand
  15: 'main_hand', // wand / bow
  17: 'main_hand', // 2H
  23: 'off_hand', // held in off hand
  14: 'off_hand', // shield
};

interface Item {
  id: string;
  name: string;
  slot: ItemSlot;
  specs: number[];
  dungeon: Dungeon;
  stats: Stat[];
  bis: string[];
}

const statMap: Record<string, Stat> = {
  hastertng: 'haste',
  mastrtng: 'mastery',
  critstrkrtng: 'crit',
  versatility: 'vers',
};

(async () => {
  console.log('[M+ Loot] Fetching...');
  const items: Item[] = [];

  await Promise.all(
    Object.entries(itemIds).flatMap(([dungeon, ids]) => {
      ids.map((id) => {
        queue.add(async () => {
          console.log('[M+ Loot] Fetching item', id);
          const resp = await fetch(`https://www.wowhead.com/item=${id}&xml`);
          const text = await resp.text();
          const data = new XMLParser().parse(text);

          const json = JSON.parse(`{${data.wowhead.item.json}}`);
          const jsonEquip = JSON.parse(`{${data.wowhead.item.jsonEquip}}`);

          if (json.sourcemore?.length > 1) {
            console.warn(
              `[M+ Loot] Item ${id} has multiple sources!`,
              json.sourcemore
            );
          }

          if (!slotIdsToSlotName[json.slot]) {
            console.log('[M+ Loot] Item', id, 'has no slot!', json.slot);
          }

          items.push({
            id,
            name: json.displayName,
            slot: slotIdsToSlotName[json.slot],
            specs: json.specs,
            dungeon: dungeon as Dungeon,
            bis: Object.entries(bis).reduce((acc, [specId, { mplus }]) => {
              if (mplus.includes(id)) {
                acc.push(specId);
              }
              return acc;
            }, [] as string[]),
            stats: Object.entries(statMap).reduce((acc, [key, value]) => {
              if (typeof jsonEquip[key] !== 'undefined') {
                acc.push(value);
              }
              return acc;
            }, [] as Stat[]),
          });
        });
      });
    })
  );

  await queue.onIdle();

  console.log('[M+ Loot] Writing to file...');

  await writeFile('./src/data/mplus-loot.json', JSON.stringify(items, null, 2));

  console.log('[M+ Loot] Done!');
})();
