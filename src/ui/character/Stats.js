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
    <div className="Attribute">{title}</div>
  );
}

Attribute.propTypes = {
  title: PropTypes.string.isRequired,
};

function SavingThrows() {
  return (
    <div className="SavingThrows">
      <h1 className="blockHeader">Saving Throws</h1>
      <div className="grid">
        <SavingThrow title="STR" />
        <SavingThrow title="DEX" />
        <SavingThrow title="CON" />
        <SavingThrow title="INT" />
        <SavingThrow title="WIS" />
        <SavingThrow title="CHA" />
      </div>
    </div>
  );
}

function SavingThrow(props) {
  const { title } = props;
  return (
    <div className="row SavingThrow">
      <div className="SavingThrowTitle">{title}</div>
      <div className="SavingThrowStat">+0</div>
    </div>
  );
}

SavingThrow.propTypes = {
  title: PropTypes.string.isRequired,
};

function StatBlock(props) {
  const { children } = props;
  return (
    <div className="block">
      {children}
    </div>
  );
}

StatBlock.propTypes = {
  children: PropTypes.element.isRequired,
};

export {
  Attributes,
  SavingThrows,
  StatBlock,
};
