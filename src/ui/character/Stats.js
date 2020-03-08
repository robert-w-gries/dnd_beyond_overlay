import React from 'react';
import PropTypes from 'prop-types';

function Attributes(props) {
  const getAttribute = (attribute) => {
    if (props.attributes) {
      return props.attributes[attribute];
    }
  };
  return (
    <div className="grid Attributes">
      <Attribute title="STR" stat={getAttribute('Strength')} />
      <Attribute title="DEX" stat={getAttribute('Dexterity')} />
      <Attribute title="CON" stat={getAttribute('Constitution')} />
      <Attribute title="INT" stat={getAttribute('Intelligence')} />
      <Attribute title="WIS" stat={getAttribute('Wisdom')} />
      <Attribute title="CHA" stat={getAttribute('Charisma')} />
    </div>
  );
}

function Attribute(props) {
  const { stat, title } = props;
  return (
    <div className="check Attribute">
      <div className="attr AttributeTitle">{title}</div>
      <div className="AttributeBonus">{`${stat.sign}${stat.num}`}</div>
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
      <SavingThrow title="STR" stat={getSavingThrow('str')} />
      <SavingThrow title="DEX" stat={getSavingThrow('dex')} />
      <SavingThrow title="CON" stat={getSavingThrow('con')} />
      <SavingThrow title="INT" stat={getSavingThrow('int')} />
      <SavingThrow title="WIS" stat={getSavingThrow('wis')} />
      <SavingThrow title="CHA" stat={getSavingThrow('cha')} />
    </div>
  );
}

function SavingThrow(props) {
  const { stat, title } = props;
  return (
    <div className="check SavingThrow">
      <div className="attr SavingThrowTitle">{title}</div>
      <div className="bonus SavingThrowStat">{`${stat.sign}${stat.num}`}</div>
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
