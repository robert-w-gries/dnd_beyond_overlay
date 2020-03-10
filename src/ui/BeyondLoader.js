import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Sheet from '../models/sheet';

const fields = {
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

  const health = iframeDoc.querySelectorAll(`.${fields.health}`)[1].textContent;

  const skills = getStats(fields.skills, (skillObj, element) => {
    // eslint-disable-next-line no-param-reassign
    skillObj.prof = element.querySelector(`.${fields.skills.prof}`).getAttribute('data-original-title');
    // eslint-disable-next-line no-param-reassign
    skillObj.attr = element.querySelector(`.${fields.skills.attr}`).textContent;
  });

  return Sheet({
    attributes: getStats(fields.attributes),
    health,
    level: getElement(fields.profile.level).textContent,
    name: getElement(fields.characterName).textContent,
    savingThrows: getStats(fields.savingThrows),
    skills,
  });
}

function BeyondLoader(props) {
  const { onBeyondError, onBeyondLoaded, selectedProfile } = props;
  if (!selectedProfile.id) {
    return null;
  }

  const url = `https://www.dndbeyond.com/characters/${selectedProfile.id}`;
  return (
    <BeyondFrame
      url={url}
      onBeyondLoaded={onBeyondLoaded}
      onBeyondError={() => { onBeyondError(); }}
    />
  );
}

BeyondLoader.propTypes = {
  onBeyondError: PropTypes.func.isRequired,
  onBeyondLoaded: PropTypes.func.isRequired,
  selectedProfile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

BeyondLoader.defaultProps = {
  selectedProfile: {
    avatar: '',
    id: null,
    level: '',
    name: '',
  },
};

function BeyondFrame(props) {
  const { onBeyondLoaded, onBeyondError, url } = props;

  const frameRef = useRef();

  const checkSheetLoaded = () => {
    const frameDocument = frameRef.current.contentDocument;

    if (frameDocument.querySelector(`.${fields.loading.loaded}`)) {
      const data = formData(frameDocument);
      onBeyondLoaded(data);
    } else if (frameDocument.querySelector(`.${fields.loading.failed}`)) {
      onBeyondError();
    } else {
      setTimeout(() => {
        checkSheetLoaded();
      }, 500, frameDocument);
    }
  };

  return (
    <iframe is="x-frame-bypass" title="charSheet" src={url} ref={frameRef} onError={onBeyondError} onLoad={checkSheetLoaded} />
  );
}

BeyondFrame.propTypes = {
  onBeyondError: PropTypes.func.isRequired,
  onBeyondLoaded: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default BeyondLoader;
