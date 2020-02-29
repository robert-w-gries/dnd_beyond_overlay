import React from 'react';
import './Character.css';
import StatBlock from './StatBlock';
import SavingThrowsBlock from './SavingThrowsBlock';

function Character() {
  return (
    <div>
      <CharacterHeader />
      <StatBlock />
      <SavingThrowsBlock />
    </div>
  );
}

function CharacterHeader() {
  return (
    <div className="row CharacterHeader">
      <div>CharacterName</div>
      <div>Health</div>
    </div>
  );
}

export default Character;
