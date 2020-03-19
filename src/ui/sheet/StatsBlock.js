import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/stats.module.css';

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
      <StatsBlock stats={attributes} className={styles.Attribute} />
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
        <StatsBlock stats={savingThrows} className={styles.SavingThrow} />
      </div>
    </div>
  );
}

SavingThrows.propTypes = {
  savingThrows: PropTypes.arrayOf(PropTypes.shape(statsProp)).isRequired,
};

function StatsBlock(props) {
  const { className, stats } = props;

  return stats.map(({ name, bonus }) => (
    <div className={[className, styles.check].join(' ')}>
      <div className={styles.bonusName}>
        {name}
      </div>
      <div className={styles.bonusScore}>
        {`${bonus.sign}${bonus.num}`}
      </div>
    </div>
  ));
}

StatsBlock.propTypes = {
  className: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(statsProp)).isRequired,
};

export {
  Attributes,
  SavingThrows,
};
