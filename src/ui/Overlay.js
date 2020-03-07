import React, { useState } from 'react';
import './Overlay.css';
import BeyondFrame from './BeyondFrame';
import Character from './character/Character';

function Overlay() {
  const [data, setData] = useState({ name: '', health: '' });
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
    <div>Characters</div>
  );
}

export default Overlay;
