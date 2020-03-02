import React from 'react';
import './Character.css';
import Actions from './Actions'
import StatBlock from './StatBlock';
import SavingThrowsBlock from './SavingThrowsBlock';
import Skills from './Skills'
import {Tabs, Tab} from '../utils/Tabs'

function Character() {
  return (
    <div>
      <CharacterHeader />
      <StatBlock />
      <SavingThrowsBlock />
      <Tabs default="Skills">
        <Tab title="Skills">
          <Skills />
        </Tab>
        <Tab title="Actions">
          <Actions />
        </Tab>
        <Tab title="Spells">
          <div>Spells</div>
        </Tab>
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
