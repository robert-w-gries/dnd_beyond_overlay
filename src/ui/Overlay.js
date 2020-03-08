import React, { useState } from 'react';
import './Overlay.css';
import BeyondFrame from './BeyondFrame';
import Character from './character/Character';

function Overlay() {
  const [data, setData] = useState(null);
  return (
    <div className="Overlay">
      <BeyondFrame setData={(newData) => { setData(newData); }} />
      <SelectCharacter />
      { data ? <Character sheet={data} /> : null }
    </div>
  );
}

function SelectCharacter() {
  return (
    <div className="SelectCharacter">Select A Character</div>
  );
}

export default Overlay;
