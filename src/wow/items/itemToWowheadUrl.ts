import { type Item } from './Item';

type ItemProp = keyof Item;

const IGNORED_KEYS: ItemProp[] = ['id', 'name'];
type Diff<T, U> = T extends U ? never : T;
type MappingConfig = Partial<{
  [K in ItemProp]: (
    value: Diff<Item[K], 'undefined'>
  ) => [string, string | number | undefined];
}>;

// https://www.wowhead.com/item=193519?bonus=8836:8840:8902:9405:9376:8791:9379:8960:9366&ench=6607&ilvl=447&spec=266&crafted-stats=36:40&crafting-quality=8
// https://www.wowhead.com/item=193508?bonus=8836:8840:8902:9405:9376:8793:9379:8960:9366&ilvl=447&spec=266&crafted-stats=40:36&crafting-quality=8
// https://www.wowhead.com/item=134495?bonus=6652:9144:9334:3320:8767:9477:8782&gems=192948:192985:192948&ilvl=441&spec=266
const mappingConfig: MappingConfig = {
  ilvl: (value) => ['ilvl', value],
  bonus_ids: (value) => ['bonus', value.join(':')],
  gem_ids: (value) => ['gems', value.join(':')],
  enchant_id: (value) => ['ench', value],
  crafted_stat_ids: (value) => ['crafted-stats', value.join(':')],
  crafting_quality: (value) => ['crafting-quality', String(Number(value) + 3)],
};

export const itemToWowheadUrl = (idOrItem: number | string | Item) => {
  const item = typeof idOrItem === 'object' ? idOrItem : { id: idOrItem };
  const url = new URL(`https://www.wowhead.com/ptr-2/item=${item.id}`);

  Object.entries(item)
    .filter(([key]) => !IGNORED_KEYS.includes(key as ItemProp))
    .forEach(([key, value]) => {
      const mapping = mappingConfig[key as ItemProp];

      if (!mapping) {
        return;
      }

      const [mappedKey, mappedValue] = mapping(value as never);

      if (typeof mappedValue === 'undefined' || mappedValue === 'NaN') {
        return;
      }

      url.searchParams.set(mappedKey, String(mappedValue));
    });

  return url.toString();
};
