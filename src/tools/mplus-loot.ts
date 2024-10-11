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
 * Run this script at: https://www.wowhead.com/guide/mythic-plus-dungeons/the-war-within-season-1/loot
let ids = {};
for (let table of Array.from(document.querySelectorAll('div[class="wh-center"] > table'))) {
    if (!table.querySelector('tr').dataset.background) continue;

    const links = table.querySelectorAll('a');
    Array.from(links).forEach((link) => {
        const id = link.href.match(/\/item=(\d+)/)?.[1];
        const dungeon = link.parentElement.nextSibling.innerText;
        ids[dungeon] = ids[dungeon] || [];
        ids[dungeon].push(id);
    });
}
console.log(ids);
 */

const itemIds = {
  "Ara-Kara, City of Echoes": [
      "221154",
      "221158",
      "221164",
      "221163",
      "221157",
      "221153",
      "221156",
      "221162",
      "221152",
      "221155",
      "221161",
      "221151",
      "219314",
      "219316",
      "219317",
      "221165",
      "221150",
      "221160",
      "221159"
  ],
  "The Stonevault": [
      "221088",
      "221077",
      "221095",
      "221087",
      "221164",
      "221082",
      "221081",
      "221094",
      "221147",
      "221080",
      "221075",
      "221086",
      "221079",
      "221092",
      "219303",
      "219301",
      "219315",
      "219302",
      "219300",
      "221090",
      "221091",
      "221084",
      "221078",
      "221085",
      "221089",
      "221074",
      "221073"
  ],
  "Grim Batol": [
      "56126",
      "56219",
      "133363",
      "56457",
      "56445",
      "56114",
      "133302",
      "56125",
      "56218",
      "56113",
      "56455",
      "133353",
      "133354",
      "56112",
      "157598",
      "56448",
      "56123",
      "133294",
      "133306",
      "56118",
      "56463",
      "56462",
      "56458",
      "56440",
      "56449",
      "56454",
      "56441",
      "56459",
      "56131",
      "56137",
      "56122"
  ],
  "City of Threads": [
      "221189",
      "221181",
      "221187",
      "221176",
      "221182",
      "221170",
      "221175",
      "221188",
      "221180",
      "221169",
      "221179",
      "221174",
      "221168",
      "221186",
      "221185",
      "221167",
      "221173",
      "221178",
      "219321",
      "219318",
      "219319",
      "219320",
      "221183",
      "221171",
      "221184",
      "221166",
      "221172",
      "221177"
  ],
  "The Dawnbreaker": [
      "221136",
      "221141",
      "221135",
      "221149",
      "221148",
      "221142",
      "221134",
      "221140",
      "221202",
      "221146",
      "221139",
      "221133",
      "219312",
      "219313",
      "219311",
      "221138",
      "221145",
      "221144",
      "221137",
      "221143",
      "221132"
  ],
  "The Necrotic Wake": [
      "178781",
      "178736",
      "178732",
      "178740",
      "178782",
      "178748",
      "178744",
      "178741",
      "178731",
      "178738",
      "178733",
      "178778",
      "178745",
      "178777",
      "178749",
      "178734",
      "178739",
      "178742",
      "178772",
      "178783",
      "178751",
      "178743",
      "178730",
      "178737",
      "178780",
      "178735",
      "178750"
  ],
  "Siege of Boralus": [
      "159461",
      "162541",
      "159237",
      "159965",
      "159250",
      "159251",
      "159372",
      "159968",
      "159309",
      "159322",
      "159320",
      "159372",
      "159386",
      "159969",
      "159379",
      "159429",
      "159434",
      "159427",
      "159428",
      "159623",
      "159622",
      "159973",
      "159649",
      "159650",
      "159972"
  ],
  "Mists of Tirna Scithe": [
      "178707",
      "178693",
      "178696",
      "178704",
      "178705",
      "178691",
      "178698",
      "178702",
      "178699",
      "178692",
      "178695",
      "178703",
      "178700",
      "178694",
      "178697",
      "178706",
      "178701",
      "178715",
      "178708",
      "178711",
      "178710",
      "178709",
      "178713",
      "178714",
      "178712"
  ],
  "The Necrotic Wakel": [
      "178779"
  ],
  "The Stonebreaker": [
      "221083"
  ]
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

  await writeFile('./src/data/mplus-s4-loot.json', JSON.stringify(items));

  console.log('[M+ Loot] Done!');
})();
