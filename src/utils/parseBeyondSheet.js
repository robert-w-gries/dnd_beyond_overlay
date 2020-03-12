import Sheet from '../models/sheet';
import ActionsModel from '../models/actions';
import SkillsModel from '../models/skills';
import StatsModel from '../models/stats';

const fields = {
  actions: {
    element: 'ct-combat-attack',
    name: {
      weapon: 'ct-combat-attack__label',
      spell: 'ct-spell-name',
    },
    range: {
      distance: 'ct-distance-number__number',
      range_close: 'ct-combat-attack__range-value-close',
      range_long: 'ct-combat-attack__range-value-long',
    },
    hit: {
      element: 'ct-combat-attack__tohit',
      sign: 'ct-signed-number__sign',
      num: 'ct-signed-number__number',
    },
    damage: 'ct-damage__value',
  },
  attributes: {
    element: 'ct-ability-summary',
    name: 'ct-ability-summary__label',
    sign: 'ct-signed-number__sign',
    num: 'ct-signed-number__number',
  },
  characterName: 'ct-character-tidbits__name',
  health: 'ct-health-summary__hp-number',
  loading: {
    loaded: 'ct-character-sheet-desktop',
    failed: 'ct-character-sheet--failed',
  },
  profile: {
    avatar: 'ct-character-tidbits__avatar',
    level: 'ct-character-tidbits__xp-level',
  },
  savingThrows: {
    element: 'ct-saving-throws-summary__ability',
    name: 'ct-saving-throws-summary__ability-name',
    sign: 'ct-signed-number__sign',
    num: 'ct-signed-number__number',
  },
  skills: {
    element: 'ct-skills__item',
    attr: 'ct-skills__col--stat',
    name: 'ct-skills__col--skill',
    sign: 'ct-signed-number__sign',
    num: 'ct-signed-number__number',
    prof: 'ct-tooltip',
  },
};

function findFields(element, field) {
  return element.querySelectorAll(`.${field}`);
}

function findField(element, field) {
  if (!field) throw new Error('findField(): invalid field provided');
  return findFields(element, field)[0] || null;
}

function getFieldValue(element, field) {
  return findField(element, field).textContent;
}

function getActions(doc) {
  const getToHit = (element) => {
    if (!findField(element, fields.actions.hit.element)) {
      return {
        sign: '',
        num: '--',
      };
    }
    return {
      sign: getFieldValue(element, fields.actions.hit.sign),
      num: getFieldValue(element, fields.actions.hit.num),
    };
  };

  const getRange = (element) => {
    const range = {
      range: '',
      long: '',
      reach: false,
    };
    if (findField(element, 'ct-combat-attack__empty')) {
      range.range = '--';
      return range;
    }

    const distance = findField(element, fields.actions.range.distance);
    if (distance) {
      range.range = distance.childNodes[0].nodeValue;
      range.reach = true;
      return range;
    }

    // Handle bow/crossbow that has two ranges
    range.range = getFieldValue(element, fields.actions.range.range_close);
    range.long = getFieldValue(element, fields.actions.range.range_long);
    return range;
  };

  const getName = (element) => {
    const spellName = findField(element, fields.actions.name.spell);
    if (spellName) {
      return spellName.childNodes[0].nodeValue;
    }

    return findField(element, fields.actions.name.weapon).textContent;
  };

  const array = [];
  findFields(doc, fields.actions.element).forEach((element) => {
    // eslint-disable-next-line max-len
    const damage = findField(element, fields.actions.damage) || findField(element, 'ct-combat-attack__damage');
    array.push(ActionsModel({
      name: getName(element),
      range: getRange(element),
      hit: getToHit(element),
      damage: damage.childNodes[0].nodeValue,
    }));
  });
  return array;
}

function getStat(element, fieldsObj) {
  return {
    name: getFieldValue(element, fieldsObj.name),
    bonus: {
      sign: getFieldValue(element, fieldsObj.sign),
      num: getFieldValue(element, fieldsObj.num),
    },
  };
}

function getSkills(doc) {
  const array = [];
  findFields(doc, fields.skills.element).forEach((element) => {
    // Get skill name and bonus then add proficiency and attribute type
    const skillObj = getStat(element, fields.skills);
    skillObj.prof = findField(element, fields.skills.prof).getAttribute('data-original-title');
    skillObj.attr = getFieldValue(element, fields.skills.attr);
    array.push(SkillsModel(skillObj));
  });
  return array;
}

function getStats(doc, field) {
  const array = [];
  findFields(doc, field.element).forEach((element) => {
    const statObj = getStat(element, field);
    array.push(StatsModel(statObj));
  });
  return array;
}

function parseBeyondSheet(doc) {
  return Sheet({
    actions: getActions(doc),
    attributes: getStats(doc, fields.attributes),
    health: findFields(doc, fields.health)[1].childNodes[0].nodeValue,
    level: getFieldValue(doc, fields.profile.level),
    name: getFieldValue(doc, fields.characterName),
    savingThrows: getStats(doc, fields.savingThrows),
    skills: getSkills(doc),
  });
}

function parseBeyondStatus(doc) {
  let status = 'loading';
  if (doc.querySelector(`.${fields.loading.loaded}`)) {
    status = 'loaded';
  } else if (doc.querySelector(`.${fields.loading.failed}`)) {
    status = 'failed';
  }

  return status;
}

export {
  parseBeyondSheet,
  parseBeyondStatus,
};
