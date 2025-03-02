import PQueue from 'p-queue';
import { writeFile } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';

type SpecId = string;

const specs = JSON.parse(readFileSync('./src/data/specs.json', 'utf-8')) as {
  id: string;
  icon: string;
}[];

const queue = new PQueue({ concurrency: 3 });

const urls = specs.map(({ id, icon }) => {
  // eslint-disable-next-line prefer-const
  let [classs, spec] = icon.split('-');

  if (classs === 'deathknight') {
    classs = 'death-knight';
  } else if (classs === 'demonhunter') {
    classs = 'demon-hunter';
  } else if (spec === 'beast') {
    spec = 'beast-mastery';
  }

  return {
    specId: id,
    url: `https://www.wowhead.com/guide/classes/${classs}/${spec}/bis-gear`,
  };
});

const parseIdsFromContent = (content: string, tabName: string) => {
  const [, rest] = content
    .replace(`[tab name=${tabName}]`, `[tab name="${tabName}"]`)
    .replace(`[tab name="For Raid" icon=inv_achievement_zone_undermine]`, `[tab name="Raid"]`)
    .replace(`[tab name="For Mythic+" icon=inv_relics_hourglass]`, `[tab name="Mythic+"]`)
    .replace('[tab name="Raiding BiS"]', '[tab name="Raid"')
    .replace('[tab name="Best Gear from Raid"', '[tab name="Raid"')
    .replace(/\[tab name="[^N]*Nerub'ar Palace"/, '[tab name="Raid"')
    .replace('[tab name="Mythic+ BiS"]', '[tab name="Mythic+"')
    .replace('[tab name="Best Gear from Mythic+"', '[tab name="Mythic+"')
    .replace(/\[tab name="[^S]*Season 1 Mythic\+"/, '[tab name="Mythic+"')
    .replace(/\[tab name="[^A]*Awakened Raids"/, '[tab name="Raid"')
    .replace(/\[tab name="[^S]*Season 4 Mythic\+"/, '[tab name="Mythic+"')
    .split(`[tab name="${tabName}"`);

  const [text] = rest.split('[/tab]');

  return Array.from(text.matchAll(/item=(\d+)/g), (m) => m[1]);
};

(async () => {
  console.log('[M+ BIS] Fetching...');
  const bis: Record<SpecId, Record<'raid' | 'mplus', string[]>> = {};

  await Promise.all(
    urls
      // .filter(
      //   ({ url }) =>
      //     url ===
      //     'https://www.wowhead.com/guide/classes/monk/mistweaver/bis-gear'
      // )
      .map(({ specId, url }) =>
        queue.add(async () => {
          console.log('[M+ Loot] Fetching', url);
          const resp = await fetch(url);
          const html = await resp.text();

          const line = html
            .split('\n')
            .find(
              (line) =>
                line.includes('[tabs name=bis_items]') ||
                line.includes('[tabs name=BiS_Gear]') ||
                line.includes('[tabs name=\\"Farming Gear\\"]') ||
                line.includes('[h3 toc=\\"BiS Gear\\"]')
            )
            ?.replace(/(.*)WH\.markup\.printHtml/, 'WH.markup.printHtml');

          if (line) {
            try {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ((WH) => {
                eval(line);
              })({
                markup: {
                  printHtml: (content: string) => {
                    bis[specId] = {
                      raid: parseIdsFromContent(content, 'Raid'),
                      mplus: parseIdsFromContent(content, 'Mythic+'),
                    } as any;
                  },
                },
              });
            } catch (e) {
              console.error(e);

              writeFileSync(`./error-${specId}.html`, html);

              throw e;
            }
          } else {
            console.log('Not found line:', url);
            writeFileSync(`./error-${specId}.html`, html);
          }
        })
      )
  );

  await queue.onIdle();

  console.log('[M+ BIS] Writing to file...');

  await writeFile('./src/data/mplus-bis.json', JSON.stringify(bis));

  console.log('[M+ BIS] Done!');
})();
