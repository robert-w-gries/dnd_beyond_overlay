import React from 'react';
import PropTypes from 'prop-types';

function Skills(props) {
  const getSkill = (name) => {
    if (props.skills) {
      console.log(props.skills[name]);
      return props.skills[name];
    }
  };

  return (
    <table className="table Skills">
      <tr>
        <th>Prof</th>
        <th>Attr</th>
        <th>Skill</th>
        <th>Bonus</th>
      </tr>
      <Skill title="Acrobatics" attribute="DEX" stat={getSkill('Acrobatics')} />
      <Skill title="Animal Handling" attribute="WIS" stat={getSkill('Animal Handling')} />
      <Skill title="Arcana" attribute="INT" stat={getSkill('Arcana')} />
      <Skill title="Athletics" attribute="STR" stat={getSkill('Athletics')} />
      <Skill title="Deception" attribute="CHA" stat={getSkill('Deception')} />
      <Skill title="History" attribute="INT" stat={getSkill('History')} />
      <Skill title="Insight" attribute="WIS" stat={getSkill('Insight')} />
      <Skill title="Intimidation" attribute="CHA" stat={getSkill('Intimidation')} />
      <Skill title="Investigation" attribute="INT" stat={getSkill('Investigation')} />
      <Skill title="Medicine" attribute="WIS" stat={getSkill('Medicine')} />
      <Skill title="Nature" attribute="INT" stat={getSkill('Nature')} />
      <Skill title="Perception" attribute="WIS" stat={getSkill('Perception')} />
      <Skill title="Performance" attribute="CHA" stat={getSkill('Performance')} />
      <Skill title="Persuasion" attribute="CHA" stat={getSkill('Persuasion')} />
      <Skill title="Religion" attribute="INT" stat={getSkill('Religion')} />
      <Skill title="Sleight of Hand" attribute="DEX" stat={getSkill('Sleight of Hand')} />
      <Skill title="Stealth" attribute="DEX" stat={getSkill('Stealth')} />
      <Skill title="Survival" attribute="WIS" stat={getSkill('Survival')} />
    </table>
  );
}

function Skill(props) {
  const { attribute, stat, title } = props;
  const proficiencyChars = {
    'Half Proficiency': String.fromCharCode(9680),
    Proficiency: String.fromCharCode(9679),
    Expertise: String.fromCharCode(10687),
    none: String.fromCharCode(9675),
  };

  return (
    <tr className="check">
      <td>{proficiencyChars[stat.prof]}</td>
      <td className="attr">{attribute}</td>
      <td>{title}</td>
      <td className="bonus">{`${stat.sign}${stat.num}`}</td>
    </tr>
  );
}

Skill.propTypes = {
  attribute: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Skills;
