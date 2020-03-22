import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/sheet.module.css';
import ActionsTable from './Actions';
import { Attributes, SavingThrows } from './StatsBlock';
import SkillsTable from './Skills';
import { TabsRow, TabContent } from '../tabs/TabsRow';

function CharacterSheet(props) {
  const { sheet } = props;

  if (!sheet) {
    return null;
  }

  const {
    actions, attributes, health, name, savingThrows, skills,
  } = sheet;

  return (
    <div className={styles.CharacterSheet}>
      <CharacterHeader name={name} health={health} />
      <Attributes attributes={attributes} characterName={name} />
      <SavingThrows savingThrows={savingThrows} characterName={name} />
      <TabsRow defaultTab="Skills">
        <TabContent title="Skills">
          <SkillsTable skills={skills} characterName={name} />
        </TabContent>
        <TabContent title="Actions">
          <ActionsTable actions={actions} characterName={name} />
        </TabContent>
      </TabsRow>
    </div>
  );
}

CharacterSheet.propTypes = {
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
    <div className={styles.CharacterHeader}>
      <div className={styles.CharacterName}>{name}</div>
      <div>{`${health} HP`}</div>
    </div>
  );
}

CharacterHeader.propTypes = {
  health: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CharacterSheet;
