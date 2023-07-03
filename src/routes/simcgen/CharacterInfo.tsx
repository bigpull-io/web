import { component$, useContext } from '@builder.io/qwik';
import { css, cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import { WoWImage } from '~/components/image/WoWImage';
import { craftingCurrencies as craftingCurrenciesData } from '~/wow/currencies/craftingCurrencies';

import { EditorStoreContext } from './EditorStore';

export const CharacterInfo = component$(() => {
  const {
    character,
    craftingCurrencies,
    options: { maximiseCraftingResources },
  } = useContext(EditorStoreContext);

  if (!character.class) {
    return null;
  }

  return (
    <section>
      <section class={cx(flex({ alignItems: 'center' }), css({ mb: 12 }))}>
        <WoWImage
          type="class-spec"
          id={`${character.class.toLowerCase()}-${character.spec.toLowerCase()}`}
          alt={`${character.spec} ${character.class}`}
          size={60}
          styles={css({
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: `classes.${character.class}`,
            mr: 16,
          })}
        />
        <div>
          <p
            class={css({
              fontSize: 24,
              color: `classes.${character.class}`,
            })}
          >
            {character.name}
          </p>
          <p class={css({ color: 'grey' })}>
            {['level', 'race', 'spec', 'class', 'server']
              .map((field) => character[field])
              .join(' ')}
          </p>
        </div>
      </section>
      <a
        href={`https://www.wowhead.com/talent-calc/blizzard/${character.talents}`}
        target="_blank"
      >
        Talents
      </a>
      {' ∙ '}
      <a
        href={`https://raider.io/characters/${character.region}/${character.server}/${character.name}`}
        target="_blank"
      >
        Raider.io
      </a>
      {' ∙ '}
      <a
        href={`https://worldofwarcraft.com/en-gb/character/${character.region}/${character.server}/${character.name}`}
        target="_blank"
      >
        WoW Armory
      </a>
      {' ∙ '}
      <a
        href={`https://www.raidbots.com/simbot/quick?region=${character.region}&realm=${character.server}&name=${character.name}`}
        target="_blank"
      >
        Raidbots
      </a>
      {' ∙ '}
      <a
        href={`https://www.warcraftlogs.com/character/${character.region}/${character.server}/${character.name}`}
        target="_blank"
      >
        Warcraft Logs
      </a>
      {/* {Object.entries(character).map(([key, value]) => (
            <p key={key}>
              {key} = {value}
            </p>
          ))} */}

      <h4
        class={css({
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 14,
          mt: 18,
        })}
      >
        Crafting currencies
      </h4>

      {/* <pre>{JSON.stringify(craftingCurrencies, null, 2)}</pre> */}
      <table>
        {Object.entries(craftingCurrencies).map(([id, amount]) => {
          return (
            <tr key={id}>
              <td>
                <WoWImage
                  size={16}
                  type={craftingCurrenciesData[id].type}
                  id={id}
                  styles={css({ display: 'inline-block', mr: 4 })}
                />
                [{craftingCurrenciesData[id].name}]
              </td>
              <td class={css({ pl: 12 })}>
                {maximiseCraftingResources ? (
                  <span class={css({ color: 'itemQuality.epic' })}>MAX</span>
                ) : (
                  amount
                )}
              </td>
            </tr>
          );
        })}
      </table>
    </section>
  );
});
