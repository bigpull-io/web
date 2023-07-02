const { writeFile } = require('node:fs/promises');

(async () => {
  console.log('[ITEM CRAFT LEVELS] Writing to file...');

  await writeFile(
    './src/data/item-craft-levels.json',
    JSON.stringify({
      ranks: ['9401', '9402', '9403', '9404', '9405'],
    })
  );

  console.log('[ITEM CRAFT LEVELS] Done!');
})();
