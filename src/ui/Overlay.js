import React from 'react';
import './Overlay.css';
import Character from './character/Character';

function Overlay() {
  return (
    <div className="Overlay">
      <SelectCharacter />
      <Character />
    </div>
  );
}

function SelectCharacter() {
  return (
    <div>Characters</div>
  );
}

export default Overlay;
