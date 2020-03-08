import React from 'react';

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
  savingThrows: {
    element: 'ct-saving-throws-summary__ability',
    name: 'ct-saving-throws-summary__ability-name',
    sign: 'ct-signed-number__sign',
    num: 'ct-signed-number__number',
  },
  skills: {
    element: 'ct-skills__item',
    name: 'ct-skills__col--skill',
    sign: 'ct-signed-number__sign',
    num: 'ct-signed-number__number',
    prof: 'ct-tooltip',
  },
};

function formData(iframeDoc) {
  const getElement = (className) => {
    return iframeDoc.querySelector(`.${className}`);
  };

  const getStats = (fieldsObj, extraFieldsCallback) => {
    const obj = {};
    iframeDoc.querySelectorAll(`.${fieldsObj.element}`).forEach((element) => {
      const attr = element.querySelector(`.${fieldsObj.name}`).textContent;
      obj[attr] = {
        sign: element.querySelector(`.${fieldsObj.sign}`).textContent,
        num: element.querySelector(`.${fieldsObj.num}`).textContent,
      };
      if (extraFieldsCallback) {
        extraFieldsCallback(obj[attr], element);
      }
    });
    return obj;
  };

  const skills = getStats(fields.skills, (skillObj, element) => {
    skillObj['prof'] = element.querySelector(`.${fields.skills.prof}`).getAttribute('data-original-title');
    console.log(skillObj.prof);
  });

  return {
    attributes: getStats(fields.attributes),
    name: getElement(fields.characterName).textContent,
    health: getElement(fields.health).textContent,
    savingThrows: getStats(fields.savingThrows),
    skills,
  };
}

function BeyondFrame(props) {
  const url = 'https://www.dndbeyond.com/characters/20359926';

  let iframeLoaded = false;
  const checkSheetLoaded = (iframeDoc) => {
    if (iframeLoaded) {
      return;
    }
    if (iframeDoc.querySelector(`.${fields.loaded}`)) {
      const data = formData(iframeDoc);
      props.setData(data);
      iframeLoaded = true;
      return;
    }
    setTimeout(checkSheetLoaded, 500, iframeDoc);
  };

  let xframeRef = null;
  return (
    <iframe title="charSheet" is="x-frame-bypass" src={url} onLoad={() => { iframeLoaded = false; setTimeout(checkSheetLoaded, 500, xframeRef.contentDocument); }} ref={(e) => { xframeRef = e; }} />
  );
}

export default BeyondFrame;
