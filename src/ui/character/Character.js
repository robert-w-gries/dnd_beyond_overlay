import React from 'react';
import './Character.css';
import Actions from './Actions'
import StatBlock from './StatBlock';
import SavingThrowsBlock from './SavingThrowsBlock';
import Skills from './Skills'
import CollapsibleSection from '../utils/CollapsibleSection';

function Character() {
  return (
    <div>
      <CharacterHeader />
      <StatBlock />
      <SavingThrowsBlock />
      <CollapsibleSection title="Skills">
        <Skills />
      </CollapsibleSection>
      <CollapsibleSection title="Actions">
        <Actions />
      </CollapsibleSection>
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
