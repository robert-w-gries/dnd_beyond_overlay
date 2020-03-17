import React from 'react';
import PropTypes from 'prop-types';
import sheetStyles from '../styles/sheet.module.css';
import skillStyles from '../styles/skills.module.css';

function Skills(props) {
  const { skills } = props;
  const skillElements = skills.map((skillObj) => {
    const {
      attr, bonus, name, prof,
    } = skillObj;
    return <Skill key={name} attribute={attr} bonus={bonus} name={name} prof={prof} />;
  });
  return (
    <table>
      <tr>
        <th>Prof</th>
        <th>Attr</th>
        <th className={skillStyles.NameColumn}>Skill</th>
        <th className={skillStyles.BonusColumn}>Bonus</th>
      </tr>
      {skillElements}
    </table>
  );
}

Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape({
    attr: PropTypes.string.isRequired,
    bonus: PropTypes.shape({
      sign: PropTypes.string.isRequired,
      num: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
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
    <tr className={sheetStyles.check}>
      <td className="SkillsProfCol">{proficiencyChars[prof]}</td>
      <td className="attr SkillsAttrCol">{attribute}</td>
      <td className={skillStyles.NameColumn}>{name}</td>
      <td className={skillStyles.BonusColumn}>
        {`${bonus.sign}${bonus.num}`}
      </td>
    </tr>
  );
}

Skill.propTypes = {
  attribute: PropTypes.string.isRequired,
  bonus: PropTypes.shape({
    sign: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  prof: PropTypes.string.isRequired,
};

export default Skills;
