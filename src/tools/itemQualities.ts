const { writeFile } = require('node:fs/promises');

const url =
  'https://raw.githubusercontent.com/simulationcraft/simc/dragonflight/SpellDataDump/bonus_ids.txt';

(async () => {
  const qualities: Record<string, string[]> = {};

  console.log('[ITEM QUALITIES] Fetching...');
  const resp = await fetch(url);
  const data = await resp.text();

  console.log('[ITEM QUALITIES] Generating data...');
  const lines = data.split('\n').filter((l) => l.startsWith('bonus_id={'));

  lines.forEach((line) => {
    const id = line.match(/^bonus_id={ (\d+) }/)![1];

    const quality = line.match(/quality={ (\w+) }/)?.[1];

    if (quality) {
      qualities[quality] = qualities[quality] ?? [];
      qualities[quality].push(id);
    }
  });

  console.log('[ITEM QUALITIES] Writing to file...');

  await writeFile('./src/data/item-qualities.json', JSON.stringify(qualities));

  console.log('[ITEM QUALITIES] Done!');
})();
