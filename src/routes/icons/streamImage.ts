import { type RequestEvent } from '@builder.io/qwik-city';

const headersToCopy = [
  'content-type',
  'content-length',
  'last-modified',
  'expires',
  'cache-control',
  'etag',
  'age',
];

export const streamImage = async (
  url: string,
  request: RequestEvent<QwikCityPlatform>
) => {
  const resp = await fetch(url);

  headersToCopy.forEach((name) => {
    request.headers.set(name, resp.headers.get(name)!);
  });

  resp.body!.pipeTo(request.getWritableStream());
};
