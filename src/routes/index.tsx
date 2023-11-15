import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

// import { SimcGen } from './simcgen/SimcGen';
import { LootTable } from './loottable/index';

export default component$(() => {
  return (
    <section>
      {/* <SimcGen /> */}
      <LootTable />

      <script src="https://wow.zamimg.com/js/tooltips.js" />
    </section>
  );
});

export const head: DocumentHead = {
  title: 'BigPull.io - Enhance your simc export before simming',
  meta: [
    {
      name: 'description',
      content: 'Enhance your simc export before simming',
    },
  ],
};
