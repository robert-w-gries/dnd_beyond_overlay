import React, { useRef } from 'react';
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

function BeyondLoader(props) {
  const { charId, onBeyondLoaded } = props;
  if (!charId) {
    return null;
  }

  const url = `https://www.dndbeyond.com/characters/${charId}`;
  return <BeyondFrame url={url} onBeyondLoaded={onBeyondLoaded} />;
}

BeyondLoader.propTypes = {
  charId: PropTypes.number.isRequired,
  onBeyondLoaded: PropTypes.func.isRequired,
};

function BeyondFrame(props) {
  const { onBeyondLoaded, url } = props;

  const frameRef = useRef();

  let isBeyondLoaded = false;
  const checkSheetLoaded = (frameDocument) => {
    if (isBeyondLoaded) {
      return;
    }

    if (frameDocument.querySelector(`.${fields.loaded}`)) {
      const data = formData(frameDocument);
      isBeyondLoaded = true;
      onBeyondLoaded(data);
      return;
    }
    setTimeout(checkSheetLoaded, 500, frameDocument);
  };

  return (
    <iframe is="x-frame-bypass" title="charSheet" src={url} ref={frameRef} onLoad={() => setTimeout(checkSheetLoaded, 500, frameRef.current.contentDocument)} />
  );
}

BeyondFrame.propTypes = {
  onBeyondLoaded: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default BeyondLoader;
