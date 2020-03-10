import React from 'react';
import PropTypes from 'prop-types';
import Actions from './Actions';
import { Attributes, SavingThrows, StatBlock } from './Stats';
import Skills from './Skills';
import { Tabs, Tab } from '../utils/Tabs';

function Character(props) {
  const { sheet } = props;
  if (!sheet) {
    return null;
  }

  const {
    actions, attributes, health, name, savingThrows, skills,
  } = sheet;
  return (
    <div className="Character">
      <CharacterHeader name={name} health={health} />
      <StatBlock>
        <Attributes attributes={attributes} />
      </StatBlock>
      <StatBlock header="Saving Throws">
        <SavingThrows savingThrows={savingThrows} />
      </StatBlock>
      <Tabs defaultTab="Skills" className="CharacterTabs">
        <Tab title="Skills">
          <Skills skills={skills} />
        </Tab>
        <Tab title="Actions">
          <Actions actions={actions} />
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

Character.propTypes = {
  sheet: PropTypes.shape({
    actions: PropTypes.array.isRequired,
    attributes: PropTypes.array.isRequired,
    health: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    savingThrows: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
  }).isRequired,
};

function CharacterHeader(props) {
  const { health, name } = props;
  return (
    <div className="row CharacterHeader">
      <div>{name}</div>
      <div>{`${health} HP`}</div>
    </div>
  );
}

CharacterHeader.propTypes = {
  health: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Character;
