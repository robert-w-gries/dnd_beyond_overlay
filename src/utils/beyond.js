import ProfileModel from '../models/profile';
import SheetModel from '../models/sheet';

const fetchCharacter = async (id) => {
  const timeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
      const timeoutHandle = setTimeout(() => {
        reject(new Error("Connection timed out."));
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutHandle);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutHandle);
          reject(err);
        },
      );
    });
  };

  const url = `https://www.dndbeyond.com/character/${id}/json`;
  const response = await timeout(5000, fetch(url));
  if (response.status === 404) {
    const strs = [
      'Could not retrieve profile.',
      'Please verify your character privacy is set to public.',
    ];
    throw new Error(strs.join('\n'));
  } else if (response.status !== 200 ) {
    throw new Error('Could not connect to DnD Beyond');
  }

  return await response.json();
};

function parseProfile(id, jsonData) {
  const avatar = jsonData.avatarUrl || '';
  const level = jsonData.classes.reduce((total, classObj) => {
    const classLevel = parseInt(classObj.level, 10);
    return total + classLevel;
  }, 0);
  return ProfileModel({
    id,
    name: jsonData.name,
    avatar,
    level,
  });
}

function getAttributes(jsonData) {
  const attributes = [
    'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma',
  ];
  const modifiers = ['background', 'class', 'feat', 'item', 'race'];

  return jsonData.stats.map(({ value }, i) => {
    const attrSubType = `${attributes[i].toLocaleLowerCase()}-score`;
    const setScore = modifiers.reduce((newScore, modifier) => {
      const modScore = jsonData.modifiers[modifier]
        .filter(({ type, subType }) => type === 'set' && subType === attrSubType)
        .reduce((modTotal, { value }) => modTotal = value > modTotal ? value : modTotal, newScore);
      return modScore > newScore ? modScore : newScore;
    }, null);
    if (setScore) {
      return setScore;
    }

    // If there isn't a set score modifier, sum up the bonuses
    return modifiers.reduce((sum, modifier) => {
      return jsonData.modifiers[modifier]
        .filter(({ type, subType }) => type === 'bonus' && subType === attrSubType)
        .reduce((total, { value }) => total += value, sum);
    }, value);
  });
}


function parseSheet(jsonData) {
  console.log(jsonData);
  const attributes = getAttributes(jsonData);
  console.log(attributes);
  throw new Error("testing");
  return SheetModel({
    name: jsonData.name,
    attributes,
  });
}

export default {
  fetchCharacter,
  parseProfile,
  parseSheet,
};
