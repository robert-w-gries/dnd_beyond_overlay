import React from 'react';
import PropTypes from 'prop-types';

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
      name, num, sign,
    } = skillObj;
    return <Attribute key={name} bonus={`${sign}${num}`} name={abbreviated[name]} />;
  });

  return (
    <div className="grid threecol Attributes">
      {attributeElements}
    </div>
  );
}

Attributes.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
  })).isRequired,
};

function Attribute(props) {
  const { bonus, name } = props;
  return (
    <div className="check Attribute">
      <div className="attr AttributeTitle">{name}</div>
      <div className="AttributeBonus">{bonus}</div>
    </div>
  );
}

Attribute.propTypes = {
  bonus: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function SavingThrows(props) {
  const { savingThrows } = props;
  const savingThrowElements = savingThrows.map((stObj) => {
    const {
      name, num, sign,
    } = stObj;
    return <SavingThrow key={name} bonus={`${sign}${num}`} name={name} />;
  });

  return (
    <div className="grid threecol SavingThrows">
      {savingThrowElements}
    </div>
  );
}

SavingThrows.propTypes = {
  savingThrows: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
  })).isRequired,
};

function SavingThrow(props) {
  const { bonus, name } = props;
  return (
    <div className="check SavingThrow">
      <div className="attr SavingThrowTitle">{name}</div>
      <div className="bonus SavingThrowStat">{bonus}</div>
    </div>
  );
}

SavingThrow.propTypes = {
  bonus: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function StatBlock(props) {
  const { children, header } = props;
  const h = (
    <h1 className="StatBlockHeader">{header}</h1>
  );
  return (
    <div className="StatBlock">
      { header ? h : null }
      {children}
    </div>
  );
}

StatBlock.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
};

StatBlock.defaultProps = {
  header: '',
};

export {
  Attributes,
  SavingThrows,
  StatBlock,
};
