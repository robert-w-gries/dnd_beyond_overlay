import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/skills.module.css';
import Check from './Check';

function Skills(props) {
  const { skills } = props;
  const skillElements = skills.map((skillObj) => {
    const {
      attr, bonus, name, prof,
    } = skillObj;
    return <Skill key={name} attribute={attr} bonus={bonus} name={name} prof={prof} />;
  });
  return (
    <div className={styles.SkillsTableWrapper}>
      <table>
        <colgroup>
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '55%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <tr>
          <th>Prof</th>
          <th>Attr</th>
          <th className={styles.bonusName}>Skill</th>
          <th className={styles.bonusScore}>Bonus</th>
        </tr>
        {skillElements}
      </table>
    </div>
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

  const bonusScore = `${bonus.sign}${bonus.num}`;
  return (
    <Check dice="1d20" bonus={bonusScore} name={`${name} Check`}>
      <tr className={styles.check}>
        <td className="SkillsProfCol">{proficiencyChars[prof]}</td>
        <td className="attr SkillsAttrCol">{attribute}</td>
        <td className={styles.bonusName}>{name}</td>
        <td className={styles.bonusScore}>{bonusScore}</td>
      </tr>
    </Check>
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
