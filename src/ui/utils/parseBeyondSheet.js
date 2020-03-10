import Sheet from '../../models/sheet';

const fields = {
  actions: {
    element: 'ct-combat-attack',
    name: {
      weapon: 'ct-combat-attack__label',
      spell: 'ct-spell-name',
    },
    range: {
      distance: 'ct-distance-number__number',
      range: 'ct-combat-attack__range-value-close',
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
  return findFields(element, field)[0] || null;
}

function getFieldValue(element, field) {
  //return findField(element, field).childNodes[0].nodeValue;
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
    if (findField(element, 'ct-combat-attack__empty')) {
      return '--';
    }

    const distance = findField(element, fields.actions.range.distance);
    if (distance) {
      return distance.childNodes[0].nodeValue;
    }

    // Handle bow/crossbow that has two ranges
    const range = getFieldValue(element, fields.actions.range.range);
    const longRange = getFieldValue(element, fields.actions.range.range_long);
    return `${range}\n${longRange}`;
  };

  const array = [];
  findFields(doc, fields.actions.element).forEach((element) => {
    // eslint-disable-next-line max-len
    const name = findField(element, fields.actions.name.spell) || findField(element, fields.actions.name.weapon);
    const damage = findField(element, fields.damage) || findField(element, 'ct-combat-attack__damage');
    array.push({
      name: name.childNodes[0].nodeValue,
      range: getRange(element),
      hit: getToHit(element),
      damage: damage.childNodes[0].nodeValue,
    });
  });
  return array;
}

function getStats(doc, fieldsObj, extraFieldsCallback) {
  const array = [];
  doc.querySelectorAll(`.${fieldsObj.element}`).forEach((element) => {
    const stat = {
      name: getFieldValue(element, fieldsObj.name),
      sign: getFieldValue(element, fieldsObj.sign),
      num: getFieldValue(element, fieldsObj.num),
    };
    if (extraFieldsCallback) {
      extraFieldsCallback(stat, element);
    }
    array.push(stat);
  });
  return array;
}

function parseBeyondSheet(doc) {
  const skills = getStats(doc, fields.skills, (skillObj, element) => {
    // eslint-disable-next-line no-param-reassign
    skillObj.prof = findField(element, fields.skills.prof).getAttribute('data-original-title');
    // eslint-disable-next-line no-param-reassign
    skillObj.attr = getFieldValue(element, fields.skills.attr);
  });

  return Sheet({
    actions: getActions(doc),
    attributes: getStats(doc, fields.attributes),
    health: findFields(doc, fields.health)[1].childNodes[0].nodeValue,
    level: getFieldValue(doc, fields.profile.level),
    name: getFieldValue(doc, fields.characterName),
    savingThrows: getStats(doc, fields.savingThrows),
    skills,
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
