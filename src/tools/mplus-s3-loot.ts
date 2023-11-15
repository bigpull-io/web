import { XMLParser } from 'fast-xml-parser';
import PQueue from 'p-queue';
import { writeFile } from 'node:fs/promises';
import type { ItemSlot } from '~/wow/items/itemSlots';

const queue = new PQueue({ concurrency: 1 });

/**
 * Run this script at: https://www.wowhead.com/guide/mythic-plus-dungeons/dragonflight-season-3/loot&xml#mythic-loot-by-dungeon
let ids = {};
for (let el = document.querySelector('h2[id="mythic-loot-by-dungeon"]'); !!el; el = el.nextSibling) {
    const table = el.querySelector('table');

    if (!table) { continue; }

    const dungeon = table.previousSibling.innerHTML;
    const links = el.querySelectorAll('a[data-type="item"]');

    if (!links.length) { continue; }

    Array.from(links).forEach((link) => {
        const id = link.href.match(/\/item=(\d+)\//)[1];
        ids[dungeon] = ids[dungeon] || [];
        ids[dungeon].push(id);
    });
}
console.log(ids);
 */
const itemIds = {
  "Dawn of the Infinite: Galakrond's Fall": [
    '207995',
    '207991',
    '207828',
    '207923',
    '207819',
    '207838',
    '207999',
    '207996',
    '207851',
    '207903',
    '207898',
    '207858',
    '207566',
    '207992',
    '207983',
    '207912',
    '207921',
    '207836',
    '207817',
    '208321',
    '207920',
    '207897',
    '207911',
    '207820',
    '207528',
  ],
  "Dawn of the Infinite: Murozond's Rise": [
    '208391',
    '207927',
    '207873',
    '207876',
    '207950',
    '207552',
    '207997',
    '207986',
    '207939',
    '207862',
    '207946',
    '207824',
    '207579',
    '208193',
    '208000',
    '207994',
    '207936',
    '207884',
    '207867',
    '207878',
    '207987',
    '207978',
    '207945',
    '207951',
    '207874',
    '207928',
    '207581',
  ],
  'Waycrest Manor': [
    '159133',
    '159669',
    '159340',
    '159272',
    '159450',
    '159345',
    '159404',
    '159659',
    '159282',
    '159399',
    '159341',
    '159456',
    '162548',
    '159630',
    '159660',
    '159294',
    '159397',
    '159285',
    '159452',
    '159616',
    '159661',
    '159457',
    '159262',
    '159403',
    '159347',
    '158362',
    '159631',
    '159662',
  ],
  "Atal'Dazar": [
    '158321',
    '158322',
    '158309',
    '158306',
    '155861',
    '158319',
    '159632',
    '158375',
    '158348',
    '159445',
    '155869',
    '158320',
    '160269',
    '158711',
    '158713',
    '160214',
    '155868',
    '158303',
    '159458',
    '158712',
    '158323',
    '211402',
    '211401',
    '211403',
    '211405',
    '211404',
    '160212',
    '158308',
    '159610',
  ],
  'Black Rook Hold': [
    '211513',
    '139245',
    '136977',
    '136976',
    '139246',
    '139242',
    '136714',
    '134440',
    '134519',
    '136724',
    '134419',
    '134490',
    '136978',
    '134426',
    '134483',
    '134528',
    '136715',
    '211470',
    '139244',
    '134499',
    '134431',
    '134451',
    '139240',
    '136716',
  ],
  'Darkheart Thicket': [
    '134520',
    '137300',
    '134423',
    '134429',
    '134487',
    '137301',
    '211473',
    '137305',
    '137304',
    '134531',
    '137306',
    '137311',
    '137309',
    '134461',
    '137310',
    '134464',
    '137312',
    '137322',
    '134405',
    '134462',
    '137320',
    '137319',
    '137315',
  ],
  Everbloom: [
    '119175',
    '109848',
    '109999',
    '119176',
    '109824',
    '109841',
    '109807',
    '109815',
    '110009',
    '119174',
    '109979',
    '109984',
    '109986',
    '109866',
    '109876',
    '110014',
    '119181',
    '119173',
    '109948',
    '109937',
    '109939',
    '109886',
    '109795',
    '110004',
    '110019',
  ],
  'Throne of the Tides': [
    '133179',
    '133367',
    '133182',
    '133358',
    '133181',
    '133184',
    '133186',
    '133185',
    '133187',
    '133200',
    '133191',
    '133360',
    '133190',
    '133192',
    '133196',
    '133202',
    '133198',
    '133368',
    '133195',
    '133197',
    '133201',
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
}

const statMap: Record<string, Stat> = {
  hastertng: 'haste',
  mastrtng: 'mastery',
  critstrkrtng: 'crit',
  versatility: 'vers',
};

(async () => {
  console.log('[M+ S3 Loot] Fetching...');
  const items: Item[] = [];

  await Promise.all(
    Object.entries(itemIds).flatMap(([dungeon, ids]) => {
      ids.map((id) => {
        queue.add(async () => {
          console.log('[M+ S3 Loot] Fetching item', id);
          const resp = await fetch(`https://www.wowhead.com/item=${id}&xml`);
          const text = await resp.text();
          const data = new XMLParser().parse(text);

          const json = JSON.parse(`{${data.wowhead.item.json}}`);
          const jsonEquip = JSON.parse(`{${data.wowhead.item.jsonEquip}}`);

          if (json.sourcemore?.length > 1) {
            console.warn(
              `[M+ S3 Loot] Item ${id} has multiple sources!`,
              json.sourcemore
            );
          }

          if (!slotIdsToSlotName[json.slot]) {
            console.log('[M+ S3 Loot] Item', id, 'has no slot!', json.slot);
          }

          items.push({
            id,
            name: json.displayName,
            slot: slotIdsToSlotName[json.slot],
            specs: json.specs,
            dungeon: dungeon as Dungeon,
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

  console.log('[M+ S3 Loot] Writing to file...');

  await writeFile('./src/data/mplus-s3-loot.json', JSON.stringify(items));

  console.log('[M+ S3 Loot] Done!');
})();
