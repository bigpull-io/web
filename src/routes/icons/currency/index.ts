import { type RequestHandler } from '@builder.io/qwik-city';
import { streamImage } from '../streamImage';

const iconNames: Record<string, string> = {
  '1792': 'achievement_legionpvptier4',
  '2122': 'inv_cloudserpent_egg_yellow',
  '2245': 'flightstone-dragonflight',
};

export const onGet: RequestHandler = async (request) => {
  const { query, text } = request;
  const id = query.get('id')!;
  const iconName = iconNames[id];

  if (!iconName) {
    text(404, 'Not found');
    return;
  }

  // headers.set(
  //   'location',
  //   `https://wow.zamimg.com/images/wow/icons/large/${iconName}.jpg`
  // );

  // send(301, '');

  await streamImage(
    `https://wow.zamimg.com/images/wow/icons/large/${iconName}.jpg`,
    request
  );
};
