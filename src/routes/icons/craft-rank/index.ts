import { type RequestHandler } from '@builder.io/qwik-city';

import { streamImage } from '../streamImage';

const allowedRanks = ['1', '2', '3', '4', '5'];

export const onGet: RequestHandler = async (request) => {
  const { query, text } = request;
  const rank = query.get('id')!;

  if (!allowedRanks.includes(rank)) {
    text(404, 'Not found');
    return;
  }

  // headers.set(
  //   'location',
  //   `https://wow.zamimg.com/images/wow/TextureAtlas/live/professions-chaticon-quality-tier${rank}.png`
  // );

  // send(301, '');

  await streamImage(
    `https://wow.zamimg.com/images/wow/TextureAtlas/live/professions-chaticon-quality-tier${rank}.png`,
    request
  );
};
