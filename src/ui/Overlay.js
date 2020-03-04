import React from 'react';
import './Overlay.css';
import Character from './character/Character';

function Overlay() {
  return (
    <div className="Overlay">
      <Selections />
      <Character />
    </div>
  );
}

function Selections() {
  return (
    <div className="row Selections">
      <SelectCampaign />
      <SelectCharacter />
    </div>
  );
}

function SelectCampaign() {
  return (
    <div>Campaigns</div>
  );
}

function SelectCharacter() {
  return (
    <div>Characters</div>
  );
}

export default Overlay;
