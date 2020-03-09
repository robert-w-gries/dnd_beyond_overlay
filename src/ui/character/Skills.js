import React from 'react';
import PropTypes from 'prop-types';

function Skills(props) {
  const { skills } = props;
  const skillElements = skills.map((skillObj) => {
    const {
      attr, name, num, prof, sign,
    } = skillObj;
    return <Skill key={name} attribute={attr} bonus={`${sign}${num}`} name={name} prof={prof} />;
  });
  return (
    <table className="table Skills">
      <tr>
        <th>Prof</th>
        <th>Attr</th>
        <th className="SkillsNameCol">Skill</th>
        <th className="SkillsBonusCol">Bonus</th>
      </tr>
      {skillElements}
    </table>
  );
}

Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape({
    attr: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
    prof: PropTypes.string.isRequired,
  })).isRequired,
};

function Skill(props) {
  const {
    attribute, bonus, name, prof,
  } = props;

  const proficiencyChars = {
    'Half Proficiency': String.fromCharCode(9680),
    Proficiency: String.fromCharCode(11044),
    Expertise: String.fromCharCode(10687),
    'Not Proficient': String.fromCharCode(9675),
  };

  return (
    <tr className="check">
      <td className="SkillsProfCol">{proficiencyChars[prof]}</td>
      <td className="attr SkillsAttrCol">{attribute}</td>
      <td className="underline SkillsNameCol">{name}</td>
      <td className="bonus SkillsBonusCol underline">{bonus}</td>
    </tr>
  );
}

Skill.propTypes = {
  attribute: PropTypes.string.isRequired,
  bonus: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prof: PropTypes.string.isRequired,
};

export default Skills;
