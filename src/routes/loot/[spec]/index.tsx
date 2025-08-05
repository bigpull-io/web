import { component$ } from '@builder.io/qwik';
import {
  RequestHandler,
  useLocation,
  type DocumentHead,
} from '@builder.io/qwik-city';
import specs from '~/data/specs.json';

import { LootTable } from '~/components/loottable/index';

const getSpec = (slug: string) => {
  return specs.find(
    (spec) => spec.fullName.toLowerCase().replace(/ /g, '-') === slug
  );
};

export default component$(() => {
  const { params } = useLocation();

  const spec = getSpec(params.spec);

  if (!spec) {
    return null;
  }

  return (
    <section>
      {/* <SimcGen /> */}
      <LootTable selectedSpec={spec.id} />

      <script src="https://wow.zamimg.com/js/tooltips.js" />
    </section>
  );
});

export const head: DocumentHead = ({ params }) => {
  const spec = getSpec(params.spec)!;

  return {
    title: `${spec.fullName} | BigPull.io`,
  };
};

export const onGet: RequestHandler = async ({ params, redirect }) => {
  const spec = getSpec(params.spec);

  if (!spec) {
    throw redirect(302, '/');
  }
};
