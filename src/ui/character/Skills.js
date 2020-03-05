import React from 'react';
import PropTypes from 'prop-types';

function Skills() {
  return (
    <table className="table Skills">
      <tr>
        <th>Prof</th>
        <th>Attr</th>
        <th>Skill</th>
        <th>Bonus</th>
      </tr>
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
    </table>
  );
}

function Skill(props) {
  const { attribute, title } = props;
  const proficiencyChars = {
    half: String.fromCharCode(9680),
    proficient: String.fromCharCode(9679),
    expertise: String.fromCharCode(10687),
    none: String.fromCharCode(9675),
  };

  return (
    <tr className="check">
      <td>{proficiencyChars.expertise}</td>
      <td className="attr">{attribute}</td>
      <td>{title}</td>
      <td className="bonus">+0</td>
    </tr>
  );
}

Skill.propTypes = {
  attribute: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Skills;
