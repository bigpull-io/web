import { type RequestHandler } from '@builder.io/qwik-city';
import { XMLParser } from 'fast-xml-parser';

import { streamImage } from '../streamImage';

const iconNames = new Map();
const parser = new XMLParser();

/**
 * @TODO:
 *   - local cache for item_id -> icon_name
 *   - local cache for images?
 */
export const onGet: RequestHandler = async (request) => {
  const { query, text } = request;
  const id = query.get('id');

  if (!id) {
    text(404, 'Not found');
    return;
  }

  if (!iconNames.has(id)) {
    // https://www.wowhead.com/item=193519?xml
    const resp = await fetch(`https://www.wowhead.com/item=${id}?xml`);
    const xml = await resp.text();
    const data = parser.parse(xml);

    try {
      const { icon } = data.wowhead.item;
      iconNames.set(id, icon);
    } catch (e) {
      console.error(
        `[ERROR] When fetching item data from wowhead: id=${id}`,
        e
      );
      text(404, 'Not found');
      return;
    }
  }

  const iconName = iconNames.get(id);

  // https://wow.zamimg.com/images/wow/icons/medium/${iconName}.jpg
  // headers.set(
  //   'location',
  //   `https://wow.zamimg.com/images/wow/icons/medium/${iconName}.jpg`
  // );

  // send(301, '');

  // return;

  await streamImage(
    `https://wow.zamimg.com/images/wow/icons/large/${iconName}.jpg`,
    request
  );
};
