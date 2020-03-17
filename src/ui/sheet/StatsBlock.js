import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/sheet.module.css';

const abbreviated = {
  Strength: 'str',
  Dexterity: 'dex',
  Constitution: 'con',
  Intelligence: 'int',
  Wisdom: 'wis',
  Charisma: 'cha',
};

function Attributes(props) {
  const { attributes } = props;
  const attributeElements = attributes.map((skillObj) => {
    const {
      name, bonus,
    } = skillObj;
    return <Attribute key={name} bonus={bonus} name={abbreviated[name]} />;
  });

  return (
    <div className={styles.StatsBlockGrid}>
      {attributeElements}
    </div>
  );
}

Attributes.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    bonus: PropTypes.shape({
      sign: PropTypes.string.isRequired,
      num: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
};

function Attribute(props) {
  const { bonus, name } = props;
  return (
    <div className={[styles.Attribute, styles.check].join(' ')}>
      <div>{name}</div>
      <div>{`${bonus.sign}${bonus.num}`}</div>
    </div>
  );
}

Attribute.propTypes = {
  bonus: PropTypes.shape({
    sign: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

function SavingThrows(props) {
  const { savingThrows } = props;
  const savingThrowElements = savingThrows.map((stObj) => {
    const {
      name, bonus,
    } = stObj;
    return <SavingThrow key={name} bonus={bonus} name={name} />;
  });

  return (
    <div className={styles.StatsBlockGrid}>
      {savingThrowElements}
    </div>
  );
}

SavingThrows.propTypes = {
  savingThrows: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    bonus: PropTypes.shape({
      sign: PropTypes.string.isRequired,
      num: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

function SavingThrow(props) {
  const { bonus, name } = props;
  return (
    <div className={[styles.SavingThrow, styles.check].join(' ')}>
      <div className={styles.SavingThrowName}>{name}</div>
      <div
        className={[styles.SavingThrowBonus, styles.bonus].join(' ')}
      >
        {`${bonus.sign}${bonus.num}`}
      </div>
    </div>
  );
}

SavingThrow.propTypes = {
  bonus: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function StatsBlock(props) {
  const { children, header } = props;
  const h = (
    <h1 className={styles.StatsBlockHeader}>{header}</h1>
  );
  return (
    <div>
      { header ? h : null }
      {children}
    </div>
  );
}

StatsBlock.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
};

StatsBlock.defaultProps = {
  header: '',
};

export {
  Attributes,
  SavingThrows,
  StatsBlock,
};
