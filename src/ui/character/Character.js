import React from 'react';
import './Character.css';
import Actions from './Actions'
import StatBlock from './StatBlock';
import SavingThrowsBlock from './SavingThrowsBlock';
import Skills from './Skills'
import Tabs from '../utils/Tabs'
import CollapsibleSection from '../utils/CollapsibleSection';

function Character() {
  return (
    <div>
      <CharacterHeader />
      <StatBlock />
      <SavingThrowsBlock />
      <Tabs default="Skills">
        <Skills tabTitle="Skills" />
        <Actions tabTitle="Actions" />
        <div tabTitle="Spells">Spells</div>
      </Tabs>
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
