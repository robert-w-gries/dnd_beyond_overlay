import React from 'react';

function BeyondFrame(props) {
  const url = 'https://www.dndbeyond.com/characters/20359926';

  let iframeLoaded = false;
  const checkSheetLoaded = (iframeDoc) => {
    if (iframeLoaded) {
      return;
    }
    if (iframeDoc.querySelector('.ct-character-sheet-desktop')) {
      const name = iframeDoc.querySelector('.ct-character-tidbits__name');
      props.setData({ name: name.textContent });
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
