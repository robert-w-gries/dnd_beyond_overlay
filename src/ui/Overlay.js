import React, { useState } from 'react';
import './Overlay.css';
import BeyondFrame from './BeyondFrame';
import Character from './character/Character';

function Overlay() {
  const [data, setData] = useState({
    attributes: '',
    name: '',
    health: '',
    savingThrows: '',
  });
  return (
    <div className="Overlay">
      <BeyondFrame setData={(newData) => { setData(newData); }} />
      <SelectCharacter />
      <Character sheet={data} />
    </div>
  );
}

function SelectCharacter() {
  return (
    <div className="SelectCharacter">Select A Character</div>
  );
}

export default Overlay;
