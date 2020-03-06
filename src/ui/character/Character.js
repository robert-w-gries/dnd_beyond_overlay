import React from 'react';
import Actions from './Actions';
import { Attributes, SavingThrows, StatBlock } from './Stats';
import Skills from './Skills';
import { Tabs, Tab } from '../utils/Tabs';

function Character() {
  // const name = document.getElementsByClassName('ct-character-tidbits__name');
  const url = 'https://www.dndbeyond.com/characters/20359926';
  const xframe = (
    <iframe title="charSheet" is="x-frame-bypass" src={url} style={{ height: '100%', width: '100%', left: '0', top: '0', position: 'absolute' }} />
  );
  return (
    <div className="Character">
      {xframe}
      <CharacterHeader />
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

function CharacterHeader() {
  return (
    <div className="row CharacterHeader">
      <div>CharacterName</div>
      <div>Health</div>
    </div>
  );
}

export default Character;
