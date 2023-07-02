import { component$ } from '@builder.io/qwik';

export const Sentry = component$(() => {
  if (!import.meta.env.PROD) return null;

  return (
    <>
      <script
        src="https://js.sentry-cdn.com/09cf6de6f97a417c82382297997e9deb.min.js"
        crossOrigin="anonymous"
      />
      <script
        dangerouslySetInnerHTML={`
          Sentry.onLoad(function() {
            Sentry.init({
              environment: ${
                import.meta.env.PROD ? 'production' : 'development'
              },
              release: "${import.meta.env.APP_VERSION}",
              allowUrls: [
                "https://www.bigpull.io/",
              ],
            });
          });
        `}
      />
    </>
  );
});
