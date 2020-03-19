import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/stats.module.css';
import Check from './Check';

const statsProp = {
  name: PropTypes.string.isRequired,
  bonus: PropTypes.shape({
    sign: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
  }).isRequired,
};

function Attributes(props) {
  const { attributes } = props;

  return (
    <div className={styles.StatsBlockGrid}>
      <StatsBlock stats={attributes} className={styles.Attribute} statType="Check" />
    </div>
  );
}

Attributes.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape(statsProp)).isRequired,
};

function SavingThrows(props) {
  const { savingThrows } = props;

  return (
    <div>
      <h1 className={styles.StatsBlockHeader}>
        Saving Throws
      </h1>
      <div className={styles.StatsBlockGrid}>
        <StatsBlock stats={savingThrows} className={styles.SavingThrow} statType="Saving Throw" />
      </div>
    </div>
  );
}

SavingThrows.propTypes = {
  savingThrows: PropTypes.arrayOf(PropTypes.shape(statsProp)).isRequired,
};

const abbrevToLong = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma',
};

function StatsBlock(props) {
  const { className, stats, statType } = props;

  return stats.map(({ name, bonus }) => {
    const bonusScore = `${bonus.sign}${bonus.num}`;

    const statTypeName = () => {
      if (statType === 'Check') {
        return `${name} Check`;
      }

      return `${abbrevToLong[name]} Saving Throw`;
    };

    return (
      <Check dice="1d20" bonus={bonusScore} name={statTypeName()}>
        <div className={[className, styles.check].join(' ')}>
          <div className={styles.bonusName}>
            {name}
          </div>
          <div className={styles.bonusScore}>
            {bonusScore}
          </div>
        </div>
      </Check>
    );
  });
}

StatsBlock.propTypes = {
  className: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(statsProp)).isRequired,
  statType: PropTypes.string.isRequired,
};

export {
  Attributes,
  SavingThrows,
};
