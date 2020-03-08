import React from 'react';

const fields = {
  attributes: 'ct-ability-summary',
  characterName: 'ct-character-tidbits__name',
  health: 'ct-health-summary__hp-number',
  loaded: 'ct-character-sheet-desktop',
  savingThrows: 'ct-saving-throws-summary__ability',
};

function formData(iframeDoc) {
  const getElement = (className) => {
    return iframeDoc.querySelector(`.${className}`);
  };

  const attributes = {};
  iframeDoc.querySelectorAll(`.${fields.attributes}`).forEach((element) => {
    const attr = element.querySelector('.ct-ability-summary__label').textContent;
    const sign = element.querySelector('.ct-signed-number__sign').textContent;
    const num = element.querySelector('.ct-signed-number__number').textContent;
    attributes[attr] = `${sign}${num}`;
  });

  const savingThrows = {};
  iframeDoc.querySelectorAll(`.${fields.savingThrows}`).forEach((element) => {
    const attr = element.querySelector('.ct-saving-throws-summary__ability-name').textContent;
    const sign = element.querySelector('.ct-signed-number__sign').textContent;
    const num = element.querySelector('.ct-signed-number__number').textContent;
    savingThrows[attr] = `${sign}${num}`;
  });

  return {
    attributes,
    name: getElement(fields.characterName).textContent,
    health: getElement(fields.health).textContent,
    savingThrows,
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
