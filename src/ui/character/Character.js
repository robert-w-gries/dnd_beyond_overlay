import React from 'react';
import './Character.css';
import Actions from './Actions';
import { Attributes, SavingThrows, StatBlock } from './Stats';
import Skills from './Skills';
import { Tabs, Tab } from '../utils/Tabs';

function Character() {
  return (
    <div className="Character">
      <CharacterHeader />
      <StatBlock>
        <Attributes />
      </StatBlock>
      <StatBlock>
        <SavingThrows />
      </StatBlock>
      <Tabs defaultTab="Skills">
        <Tab title="Skills">
          <Skills />
        </Tab>
        <Tab title="Actions">
          <Actions />
        </Tab>
        <Tab title="Spells">
          <div>Spells</div>
          <div>Spells</div>
          <div>Spells</div>
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
