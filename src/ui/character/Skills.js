import React from 'react';
import PropTypes from 'prop-types';

function Skills() {
  return (
    <div className="Skills">
      <Skill title="Acrobatics" attribute="DEX" />
      <Skill title="Animal Handling" attribute="WIS" />
      <Skill title="Arcana" attribute="INT" />
      <Skill title="Athletics" attribute="STR" />
      <Skill title="Deception" attribute="CHA" />
      <Skill title="History" attribute="INT" />
      <Skill title="Insight" attribute="WIS" />
      <Skill title="Intimidation" attribute="CHA" />
      <Skill title="Investigation" attribute="INT" />
      <Skill title="Medicine" attribute="WIS" />
      <Skill title="Nature" attribute="INT" />
      <Skill title="Perception" attribute="WIS" />
      <Skill title="Performance" attribute="CHA" />
      <Skill title="Persuasion" attribute="CHA" />
      <Skill title="Religion" attribute="INT" />
      <Skill title="Sleight of Hand" attribute="DEX" />
      <Skill title="Stealth" attribute="DEX" />
      <Skill title="Survival" attribute="WIS" />
    </div>
  );
}

function Skill(props) {
  const { attribute, title } = props;
  return (
    <div className="row Skill">
      <div className="box">o</div>
      <div className="box attribute">{attribute}</div>
      <div className="box name">{title}</div>
      <div className="box">+0</div>
    </div>
  );
}

Skill.propTypes = {
  attribute: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Skills;
