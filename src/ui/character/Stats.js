import React from 'react';
import PropTypes from 'prop-types';

function Attributes(props) {
  const getAttribute = (attribute) => {
    if (props.attributes) {
      return props.attributes[attribute];
    }
    return null;
  };
  return (
    <div className="grid Attributes">
      <Attribute title="STR" score={getAttribute('Strength')} />
      <Attribute title="DEX" score={getAttribute('Dexterity')} />
      <Attribute title="CON" score={getAttribute('Constitution')} />
      <Attribute title="INT" score={getAttribute('Intelligence')} />
      <Attribute title="WIS" score={getAttribute('Wisdom')} />
      <Attribute title="CHA" score={getAttribute('Charisma')} />
    </div>
  );
}

function Attribute(props) {
  const { score, title } = props;
  return (
    <div className="check Attribute">
      <div className="attr AttributeTitle">{title}</div>
      <div className="AttributeBonus">{score}</div>
    </div>
  );
}

Attribute.propTypes = {
  title: PropTypes.string.isRequired,
};

function SavingThrows(props) {
  const getSavingThrow = (attribute) => {
    if (props.savingThrows) {
      return props.savingThrows[attribute];
    }
    return null;
  };
  return (
    <div className="grid SavingThrows">
      <SavingThrow title="STR" score={getSavingThrow('str')} />
      <SavingThrow title="DEX" score={getSavingThrow('dex')} />
      <SavingThrow title="CON" score={getSavingThrow('con')} />
      <SavingThrow title="INT" score={getSavingThrow('int')} />
      <SavingThrow title="WIS" score={getSavingThrow('wis')} />
      <SavingThrow title="CHA" score={getSavingThrow('cha')} />
    </div>
  );
}

function SavingThrow(props) {
  const { score, title } = props;
  return (
    <div className="check SavingThrow">
      <div className="attr SavingThrowTitle">{title}</div>
      <div className="bonus SavingThrowStat">{score}</div>
    </div>
  );
}

SavingThrow.propTypes = {
  title: PropTypes.string.isRequired,
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
