import React from 'react';
import PropTypes from 'prop-types';

const fields = {
  attributes: {
    element: 'ct-ability-summary',
    name: 'ct-ability-summary__label',
    sign: 'ct-signed-number__sign',
    num: 'ct-signed-number__number',
  },
  characterName: 'ct-character-tidbits__name',
  health: 'ct-health-summary__hp-number',
  loaded: 'ct-character-sheet-desktop',
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

function formData(iframeDoc) {
  const getElement = (className) => iframeDoc.querySelector(`.${className}`);

  const getStats = (fieldsObj, extraFieldsCallback) => {
    if (iframeDoc == null) {
      return [];
    }

    const array = [];
    iframeDoc.querySelectorAll(`.${fieldsObj.element}`).forEach((element) => {
      const name = element.querySelector(`.${fieldsObj.name}`).textContent;
      const stat = {
        name,
        sign: element.querySelector(`.${fieldsObj.sign}`).textContent,
        num: element.querySelector(`.${fieldsObj.num}`).textContent,
      };
      if (extraFieldsCallback) {
        extraFieldsCallback(stat, element);
      }
      array.push(stat);
    });
    return array;
  };

  const skills = getStats(fields.skills, (skillObj, element) => {
    // eslint-disable-next-line no-param-reassign
    skillObj.prof = element.querySelector(`.${fields.skills.prof}`).getAttribute('data-original-title');
    // eslint-disable-next-line no-param-reassign
    skillObj.attr = element.querySelector(`.${fields.skills.attr}`).textContent;
  });

  return {
    attributes: getStats(fields.attributes),
    health: getElement(fields.health).textContent,
    level: getElement(fields.profile.level).textContent,
    name: getElement(fields.characterName).textContent,
    savingThrows: getStats(fields.savingThrows),
    skills,
  };
}

function BeyondFrame(props) {
  const { charId, setData, setIsLoading } = props;
  if (!charId) {
    return null;
  }

  const url = `https://www.dndbeyond.com/characters/${charId}`;

  let isBeyondLoaded = false;
  let xframeRef = null;
  const checkSheetLoaded = (iframeDoc) => {
    if (isBeyondLoaded) {
      return;
    }

    if (iframeDoc.querySelector(`.${fields.loaded}`)) {
      const data = formData(iframeDoc);
      setData(data);
      isBeyondLoaded = true;
      setIsLoading(false);
      return;
    }
    setTimeout(checkSheetLoaded, 500, iframeDoc);
  };

  const handleLoad = () => {
    isBeyondLoaded = false;
    setTimeout(checkSheetLoaded, 500, xframeRef.contentDocument);
  };

  return (
    <iframe is="x-frame-bypass" title="charSheet" src={url} onLoad={handleLoad} ref={(e) => { xframeRef = e; }} />
  );
}

BeyondFrame.propTypes = {
  charId: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default BeyondFrame;
