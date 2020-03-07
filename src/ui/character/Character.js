import React from 'react';
import Actions from './Actions';
import { Attributes, SavingThrows, StatBlock } from './Stats';
import Skills from './Skills';
import { Tabs, Tab } from '../utils/Tabs';

function Character(props) {
  const { name, health } = props.sheet;
  return (
    <div className="Character">
      <CharacterHeader name={name} health={health} />
      <StatBlock>
        <Attributes />
      </StatBlock>
      <StatBlock header="Saving Throws">
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

function CharacterHeader(props) {
  return (
    <div className="row CharacterHeader">
      <div>{props.name}</div>
      <div>{props.health} HP</div>
    </div>
  );
}

export default Character;
