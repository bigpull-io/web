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
 */

const itemIds = {
  "Cinderbrew Meadery": [
      "221054",
      "221060",
      "221198",
      "221055",
      "221072",
      "221067",
      "221201",
      "221053",
      "221058",
      "221071",
      "221070",
      "221059",
      "221065",
      "221052",
      "221069",
      "221064",
      "221061",
      "219297",
      "219298",
      "219299",
      "221068",
      "221062",
      "221051",
      "221063",
      "221057",
      "221056"
  ],
  "Darkflame Cleft": [
      "221109",
      "221103",
      "221099",
      "221115",
      "221104",
      "221108",
      "221102",
      "221107",
      "221114",
      "221113",
      "221098",
      "221101",
      "221106",
      "221100",
      "221112",
      "219307",
      "219304",
      "219305",
      "219306",
      "221105",
      "221096",
      "221110",
      "221111",
      "221097"
  ],
  "Operation: Floodgate": [
      "234507",
      "234496",
      "234495",
      "234497",
      "234498",
      "234500",
      "234499",
      "234503",
      "234502",
      "234501",
      "234506",
      "234504",
      "234505",
      "232541",
      "232545",
      "232542",
      "232543",
      "234493",
      "234491",
      "234494",
      "234490",
      "234492"
  ],
  "Operation: Mechagon": [
      "199921",
      "235226",
      "235812",
      "168989",
      "168969",
      "168958",
      "168988",
      "168964",
      "235224",
      "235811",
      "168985",
      "168986",
      "168957",
      "168968",
      "168975",
      "235223",
      "235810",
      "168967",
      "168971",
      "168983",
      "168974",
      "168982",
      "235222",
      "235809",
      "168978",
      "168980",
      "168976",
      "168966",
      "168972",
      "232546",
      "168965",
      "169344",
      "168962",
      "168955",
      "169608",
      "168973"
  ],
  "The MOTHERLODE!!": [
      "159287",
      "159462",
      "235418",
      "235420",
      "159240",
      "159231",
      "159226",
      "158350",
      "159235",
      "235419",
      "235417",
      "158353",
      "159305",
      "159725",
      "159336",
      "235416",
      "235460",
      "158357",
      "159357",
      "159361",
      "158341",
      "235415",
      "158359",
      "155864",
      "159451",
      "159679",
      "159612",
      "159611",
      "159641",
      "159638",
      "159639",
      "159663"
  ],
  "Priory of the Sacred Flame": [
      "221200",
      "221131",
      "221126",
      "221121",
      "221125",
      "221130",
      "221120",
      "221124",
      "221119",
      "221129",
      "221203",
      "221118",
      "221123",
      "219309",
      "219308",
      "219310",
      "221128",
      "221122",
      "221116",
      "221127",
      "221117"
  ],
  "The Rookery": [
      "221197",
      "221037",
      "221050",
      "221049",
      "221036",
      "221042",
      "221048",
      "221041",
      "221035",
      "221047",
      "221040",
      "221034",
      "219295",
      "219294",
      "219296",
      "221033",
      "221044",
      "221046",
      "221038",
      "221032",
      "221039",
      "221045"
  ],
  "Theater of Pain": [
      "178870",
      "178871",
      "178869",
      "178872",
      "178803",
      "178792",
      "178806",
      "178804",
      "178795",
      "178805",
      "178801",
      "178797",
      "178799",
      "178794",
      "178798",
      "178796",
      "178802",
      "178793",
      "178807",
      "178800",
      "178811",
      "178808",
      "178809",
      "178810",
      "178863",
      "178789",
      "178864",
      "178866",
      "178865",
      "178868",
      "178867"
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

  await writeFile('./src/data/mplus-loot.json', JSON.stringify(items, null, 2));

  console.log('[M+ Loot] Done!');
})();
