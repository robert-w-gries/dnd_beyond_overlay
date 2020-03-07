import React, { useState } from 'react';
import './Overlay.css';
import Character from './character/Character';

function Overlay() {
  const [data, setData] = useState({ name: '' });
  const getData = (name) => {
    setData({
      name,
    });
  };
  return (
    <div className="Overlay">
      <BeyondIframe onDataChange={getData} />
      <SelectCharacter />
      <Character name={data.name} />
    </div>
  );
}

function BeyondIframe(props) {
  // const name = document.getElementsByClassName('ct-character-tidbits__name');
  const [element, setElement] = useState(null);
  const url = 'https://www.dndbeyond.com/characters/20359926';

  let iframeLoaded = false;
  const checkSheetLoaded = (iframeDoc) => {
    if (iframeLoaded) {
      return;
    }
    if (iframeDoc.querySelector('.ct-character-sheet-desktop')) {
      const name = iframeDoc.querySelector('.ct-character-tidbits__name');
      console.log(name.textContent);
      props.onDataChange(name.textContent);
      iframeLoaded = true;
      setElement(iframeDoc);
      return;
    }
    setTimeout(checkSheetLoaded, 500, iframeDoc);
  };

  let xframeRef = null;
  return (
    <iframe title="charSheet" is="x-frame-bypass" src={url} onLoad={() => { iframeLoaded = false; setTimeout(checkSheetLoaded, 500, xframeRef.contentDocument); }} ref={(e) => { xframeRef = e; }} />
  );
}

function SelectCharacter() {
  return (
    <div>Characters</div>
  );
}

export default Overlay;
