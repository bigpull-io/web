import { type RequestHandler } from '@builder.io/qwik-city';

import { streamImage } from '../streamImage';

const iconNames: Record<string, string> = {
  deathknight: 'classicon_deathknight',
  'deathknight-blood': 'spell_deathknight_bloodpresence',
  'deathknight-frost': 'spell_deathknight_frostpresence',
  'deathknight-unholy': 'spell_deathknight_unholypresence',

  demonhunter: 'classicon_demonhunter',
  'demonhunter-havoc': 'ability_demonhunter_specdps',
  'demonhunter-vengeance': 'ability_demonhunter_spectank',

  druid: 'classicon_druid',
  'druid-balance': 'spell_nature_starfall',
  'druid-feral': 'ability_druid_catform',
  'druid-guardian': 'ability_racial_bearform',
  'druid-restoration': 'spell_nature_healingtouch',

  evoker: 'classicon_evoker',
  'evoker-augmentation': 'classicon_evoker_augmentation',
  'evoker-devastation': 'classicon_evoker_devastation',
  'evoker-preservation': 'classicon_evoker_preservation',

  hunter: 'classicon_hunter',
  'hunter-beast-mastery': 'ability_hunter_bestialdiscipline',
  'hunter-marksmanship': 'ability_hunter_focusedaim',
  'hunter-survival': 'ability_hunter_camouflage',

  mage: 'classicon_mage',
  'mage-arcane': 'spell_holy_magicalsentry',
  'mage-fire': 'spell_fire_firebolt02',
  'mage-frost': 'spell_frost_frostbolt02',

  monk: 'classicon_monk',
  'monk-brewmaster': 'spell_monk_brewmaster_spec',
  'monk-mistweaver': 'spell_monk_mistweaver_spec',
  'monk-windwalker': 'spell_monk_windwalker_spec',

  paladin: 'classicon_paladin',
  'paladin-holy': 'spell_holy_holybolt',
  'paladin-protection': 'ability_paladin_shieldofthetemplar',
  'paladin-retribution': 'spell_holy_auraoflight',

  priest: 'classicon_priest',
  'priest-discipline': 'spell_holy_powerwordshield',
  'priest-holy': 'spell_holy_guardianspirit',
  'priest-shadow': 'spell_shadow_shadowwordpain',

  rogue: 'classicon_rogue',
  'rogue-assassination': 'ability_rogue_deadlybrew',
  'rogue-outlaw': 'ability_rogue_waylay',
  'rogue-subtlety': 'ability_stealth',

  shaman: 'classicon_shaman',
  'shaman-elemental': 'spell_nature_lightning',
  'shaman-enhancement': 'spell_shaman_improvedstormstrike',
  'shaman-restoration': 'spell_nature_magicimmunity',

  warlock: 'classicon_warlock',
  'warlock-affliction': 'spell_shadow_deathcoil',
  'warlock-demonology': 'spell_shadow_metamorphosis',
  'warlock-destruction': 'spell_shadow_rainoffire',

  warrior: 'classicon_warrior',
  'warrior-arms': 'ability_warrior_savageblow',
  'warrior-fury': 'ability_warrior_innerrage',
  'warrior-protection': 'ability_warrior_defensivestance',
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
