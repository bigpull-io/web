import { XMLParser } from 'fast-xml-parser';
import PQueue from 'p-queue';
import { writeFile } from 'node:fs/promises';
import type { ItemSlot } from '~/wow/items/itemSlots';
import { readFileSync } from 'node:fs';

const queue = new PQueue({ concurrency: 1 });

const bis = JSON.parse(
  readFileSync('./src/data/mplus-s4-bis.json', 'utf-8')
) as Record<string, Record<'raid' | 'mplus', string[]>>;

/**
 * Run this script at: https://www.wowhead.com/guide/mythic-plus-dungeons/dragonflight-season-3/loot&xml#mythic-loot-by-dungeon
let ids = {};
for (let el of Array.from(document.querySelectorAll('figure[class="wp-block-table"]'))) {
    const table = el.querySelector('table');
    const dungeon = el.previousSibling.previousSibling.innerHTML;

    if (dungeon.startsWith('Season 4') || dungeon.includes('Weapons') || dungeon.includes('Off-Hand')) continue;
    const links = table.querySelectorAll('a');
    Array.from(links).forEach((link) => {
        const id = link.href.match(/\/item=(\d+)/)?.[1];
        ids[dungeon] = ids[dungeon] || [];
        ids[dungeon].push(id);
    });
}
console.log(ids);
 */

const itemIds = {
  'Algeth’ar Academy': [
    '193716',
    '193715',
    '193713',
    '193714',
    '193717',
    '193712',
    '193722',
    '193720',
    '193719',
    '193718',
    '193723',
    '193721',
    '193708',
    '193711',
    '193710',
    '193709',
    '193701',
    '193705',
    '193707',
    '193703',
    '193704',
    '193706',
  ],
  'The Azure Vault': [
    '193634',
    '193636',
    '193635',
    '193638',
    '193637',
    '193633',
    '193629',
    '193631',
    '193628',
    '193630',
    '193632',
    '193648',
    '193647',
    '193651',
    '193650',
    '193649',
    '193645',
    '193644',
    '193641',
    '193642',
    '193646',
    '193643',
    '193639',
  ],
  'Brackenhide Hollow': [
    '193674',
    '193671',
    '193672',
    '193675',
    '193673',
    '193667',
    '193793',
    '193670',
    '193669',
    '193666',
    '193654',
    '193657',
    '193658',
    '193653',
    '193655',
    '193656',
    '193652',
    '193661',
    '193665',
    '193663',
    '193660',
    '193664',
    '193662',
  ],
  'Halls of Infusion': [
    '193746',
    '193743',
    '193745',
    '193747',
    '193744',
    '193726',
    '193725',
    '193730',
    '193724',
    '193760',
    '193770',
    '193729',
    '193731',
    '193735',
    '212683',
    '193734',
    '193733',
  ],
  Neltharus: [
    '193789',
    '193787',
    '193788',
    '193786',
    '193790',
    '193772',
    '193769',
    '193727',
    '193771',
    '193768',
    '193782',
    '193780',
    '193784',
    '193785',
    '193783',
    '193781',
    '193776',
    '193777',
    '193778',
    '193779',
    '193773',
    '193775',
  ],
  'The Nokhud Offensive': [
    '193690',
    '193694',
    '193689',
    '193695',
    '193693',
    '193692',
    '193697',
    '193699',
    '193700',
    '193698',
    '193696',
    '193681',
    '193677',
    '193679',
    '193678',
    '193680',
    '193676',
    '193683',
    '193687',
    '193684',
    '193685',
    '193686',
    '193688',
  ],
  'Ruby Life Pools': [
    '193761',
    '193759',
    '193757',
    '193728',
    '193758',
    '193762',
    '193765',
    '193763',
    '193767',
    '193764',
    '193766',
    '193755',
    '193753',
    '193751',
    '193754',
    '193752',
    '193748',
    '193691',
    '193756',
    '193750',
  ],
  'Uldaman: Legacy of Tyr': [
    '193817',
    '193819',
    '193815',
    '193812',
    '193820',
    '193816',
    '193813',
    '193668',
    '193818',
    '193809',
    '193814',
    '193810',
    '193808',
    '193804',
    '193807',
    '193806',
    '193805',
    '193795',
    '193811',
    '193794',
    '193797',
    '193796',
    '193792',
    '193800',
    '193801',
    '193791',
    '193803',
    '193799',
    '193802',
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
  console.log('[M+ S4 Loot] Fetching...');
  const items: Item[] = [];

  await Promise.all(
    Object.entries(itemIds).flatMap(([dungeon, ids]) => {
      ids.map((id) => {
        queue.add(async () => {
          console.log('[M+ S4 Loot] Fetching item', id);
          const resp = await fetch(`https://www.wowhead.com/item=${id}&xml`);
          const text = await resp.text();
          const data = new XMLParser().parse(text);

          const json = JSON.parse(`{${data.wowhead.item.json}}`);
          const jsonEquip = JSON.parse(`{${data.wowhead.item.jsonEquip}}`);

          if (json.sourcemore?.length > 1) {
            console.warn(
              `[M+ S4 Loot] Item ${id} has multiple sources!`,
              json.sourcemore
            );
          }

          if (!slotIdsToSlotName[json.slot]) {
            console.log('[M+ S4 Loot] Item', id, 'has no slot!', json.slot);
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

  console.log('[M+ S4 Loot] Writing to file...');

  await writeFile('./src/data/mplus-s4-loot.json', JSON.stringify(items));

  console.log('[M+ S4 Loot] Done!');
})();
