import React from 'react';

const fields = {
  characterName: 'ct-character-tidbits__name',
  health: 'ct-health-summary__hp-number',
  loaded: 'ct-character-sheet-desktop',
};

function formData(iframeDoc) {
  const getElement = (className) => {
    return iframeDoc.querySelector(`.${className}`);
  };

  const name = getElement(fields.characterName).textContent;
  const health = getElement(fields.health).textContent;
  return {
    name,
    health,
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
