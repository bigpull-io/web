import { captureMessage } from '~/components/sentry/capture';
import { craftingCurrencies as craftingCurrenciesData } from '~/wow/currencies/craftingCurrencies';
import { type Item } from '~/wow/items/Item';
import { getItemQuality } from '~/wow/items/getItemQuality';
import { getItemUpgradeTrack } from '~/wow/items/getItemUpgradeTrack';

type ParsedLine = Record<string, string>;

const fields = {
  info: [
    'level',
    'race',
    'region',
    'server',
    'role',
    'professions',
    'spec',
    'talents',
  ],
  classes: [
    'deathknight',
    'demonhunter',
    'druid',
    'evoker',
    'hunter',
    'mage',
    'monk',
    'priest',
    'paladin',
    'rogue',
    'shaman',
    'warlock',
    'warrior',
  ],
  slots: [
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
  ],
};

const parseLine = (line: string) => {
  return line.split(',').reduce<ParsedLine>((acc, part) => {
    const [key, value] = part.split('=');

    acc[key.replace('# ', '')] = value;

    return acc;
  }, {});
};

const createItemFromLines = (nameLine: string, parsed: ParsedLine): Item => {
  const [, name, ilvl] = nameLine.match(/^# (.*)\((\d+)\)$/)!;

  const bonusIds = parsed.bonus_id?.split('/') ?? [];

  const item: Item = {
    id: parsed.id,
    name,
    ilvl: Number(ilvl),
    quality: 'common',
    enchant_id: parsed.enchant_id,
    bonus_ids: bonusIds,
    gem_ids: parsed.gem_id?.split('/') ?? [],
    crafting_quality: parsed.crafting_quality,
    crafted_stat_ids: parsed.crafted_stats?.split('/') ?? [],
  };

  item.quality = getItemQuality(item);
  item.upgradeTrack = getItemUpgradeTrack(item);

  return item;
};

/**
 * @TODO:
 *  - fix professions
 */
export const simcParser = (input: string) => {
  const character: Record<string, string> = {};
  const equippedItems: Record<string, Item> = {};
  const bagItems: Record<string, Item[]> = {};
  const craftingCurrencies = Object.keys(craftingCurrenciesData).reduce<
    Record<string, number>
  >((acc, id) => {
    acc[id] = 0;

    return acc;
  }, {});

  let lines = input.split('\n');

  lines.forEach((line, i) => {
    // Crafting currencies
    if (line.startsWith('# upgrade_currencies')) {
      line
        .replace('# upgrade_currencies=', '')
        .split('/')
        .forEach((part) => {
          const [, id, amount] = part.split(':');
          if (craftingCurrenciesData[id]) {
            craftingCurrencies[id] = Number(amount);
          }
        }, {});

      return;
    }

    if (line.startsWith('#') || !line.trim().length) {
      return;
    }

    const parsed = parseLine(line);

    // Character info
    if (fields.info.some((field) => parsed[field] !== undefined)) {
      Object.entries(parsed).forEach(([key, value]) => {
        character[key] = value;
      });

      return;
    }

    // Character spec + name
    const clazz = fields.classes.find((field) => parsed[field] !== undefined);
    if (clazz) {
      character.class = clazz;
      character.name = JSON.parse(Object.values(parsed)[0]);

      return;
    }

    // Equipped items
    const slot = fields.slots.find((field) => parsed[field] !== undefined);
    if (slot) {
      equippedItems[slot] = createItemFromLines(lines[i - 1], parsed);

      return;
    }

    captureMessage('SimC: Unknown line', {
      extra: {
        line,
      },
    });
  });

  // Items in bags
  lines =
    input.split('### Gear from Bags')[1]?.split('###')[0]?.split('\n') ?? [];
  lines.forEach((line, i) => {
    if (!line.trim().length) {
      return;
    }

    const parsed = parseLine(line);
    const slot = fields.slots.find((field) => parsed[field] !== undefined);

    if (slot) {
      bagItems[slot] = bagItems[slot] ?? [];
      bagItems[slot].push(createItemFromLines(lines[i - 1], parsed));
    }
  });

  return {
    character,
    craftingCurrencies,
    equippedItems,
    bagItems,
  };
};
