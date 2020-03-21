import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/stats.module.css';
import Check from './Check';
import RollModel from '../../models/roll';

const statsProp = {
  name: PropTypes.string.isRequired,
  bonus: PropTypes.shape({
    sign: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
  }).isRequired,
};

function StatsGrid({ children }) {
  return <div className={styles.StatsBlockGrid}>{children}</div>;
}

StatsGrid.propTypes = {
  children: PropTypes.element.isRequired,
};

function Stat(props) {
  const {
    className, name, bonus, onCheck,
  } = props;
  return (
    <div
      role="button"
      onClick={onCheck}
      onKeyPress={onCheck}
      tabIndex={0}
      className={[className, styles.check].join(' ')}
    >
      <div className={styles.statName}>
        {name}
      </div>
      <div className={styles.bonusScore}>
        {bonus}
      </div>
    </div>
  );
}

Stat.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bonus: PropTypes.shape({
    sign: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
  }).isRequired,
  onCheck: PropTypes.func.isRequired,
};

function Attributes({ attributes, characterName }) {
  const stats = attributes.map(({ name: attrName, bonus }) => ((
    <Check
      roll={RollModel(characterName, `${attrName} Check`, (roll) => ({
        roll: roll(`1d20 ${bonus.sign} ${bonus.num}`),
      }))}>
      <Stat className={styles.Attribute} name={attrName} bonus={`${bonus.sign}${bonus.num}`} />
    </Check>
  )));
  return (
    <StatsGrid>
      {stats}
    </StatsGrid>
  );
}

Attributes.propTypes = {
  characterName: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape(statsProp)).isRequired,
};

function SavingThrows({ savingThrows, characterName }) {
  const stats = savingThrows.map(({ name: throwName, bonus }) => ((
    <Check
      roll={RollModel(characterName, `${throwName} Saving Throw`, (roll) => ({
        roll: roll(`1d20 ${bonus.sign} ${bonus.num}`),
      }))}>
      <Stat className={styles.SavingThrow} name={throwName} bonus={`${bonus.sign}${bonus.num}`} />
    </Check>
  )));
  return (
    <div>
      <h1 className={styles.StatsBlockHeader}>Saving Throws</h1>
      <StatsGrid>
        {stats}
      </StatsGrid>
    </div>
  );
}

SavingThrows.propTypes = {
  characterName: PropTypes.string.isRequired,
  savingThrows: PropTypes.arrayOf(PropTypes.shape(statsProp)).isRequired,
};

export {
  Attributes,
  SavingThrows,
};
