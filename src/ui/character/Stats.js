import React from 'react';
import PropTypes from 'prop-types';

function Attributes() {
  return (
    <div className="grid Attributes">
      <Attribute title="STR" />
      <Attribute title="DEX" />
      <Attribute title="CON" />
      <Attribute title="INT" />
      <Attribute title="WIS" />
      <Attribute title="CHA" />
    </div>
  );
}

function Attribute(props) {
  const { title } = props;
  return (
    <div className="check Attribute">
      <div className="attr AttributeTitle">{title}</div>
      <div className="AttributeBonus">+0</div>
    </div>
  );
}

Attribute.propTypes = {
  title: PropTypes.string.isRequired,
};

function SavingThrows() {
  return (
    <div className="grid SavingThrows">
      <SavingThrow title="STR" />
      <SavingThrow title="DEX" />
      <SavingThrow title="CON" />
      <SavingThrow title="INT" />
      <SavingThrow title="WIS" />
      <SavingThrow title="CHA" />
    </div>
  );
}

function SavingThrow(props) {
  const { title } = props;
  return (
    <div className="check SavingThrow">
      <div className="attr SavingThrowTitle">{title}</div>
      <div className="bonus SavingThrowStat">+0</div>
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
