import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/skills.module.css';
import Check from './Check';
import Table from './Table';

function SkillsTable({ skills, characterName }) {
  const skillRows = skills.map(({
    prof, attr, name: skillName, bonus,
  }) => ((
    <Check
      key={skillName}
      roll={{
        characterName,
        type: `${skillName} Check`,
        roll: `1d20${bonus}`,
      }}
    >
      <SkillRow key={skillName} attribute={attr} bonus={bonus} name={skillName} prof={prof} />
    </Check>
  )));

  return (
    <Table
      rows={skillRows}
      tableClass={styles.SkillsTable}
      cols={[
        { header: 'Prof', width: 15 },
        { header: 'Attr', width: 15 },
        { header: 'Skill', width: 55, className: styles.skillName },
        { header: 'Bonus', width: 15, className: styles.bonusScore },
      ]}
    />
  );
}

SkillsTable.propTypes = {
  characterName: PropTypes.string.isRequired,
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

function SkillRow(props) {
  const {
    attribute, bonus, name, prof, onCheck,
  } = props;

  const proficiencyChars = {
    'Half Proficiency': String.fromCharCode(9680),
    Proficiency: String.fromCharCode(11044),
    Expertise: String.fromCharCode(10687),
    'Not Proficient': String.fromCharCode(9675),
  };

  const bonusScore = `${bonus.sign}${bonus.num}`;
  return (
    <tr className={styles.check} onClick={onCheck}>
      <td>{proficiencyChars[prof]}</td>
      <td>{attribute}</td>
      <td className={styles.skillName}>{name}</td>
      <td className={styles.bonusScore}>{bonusScore}</td>
    </tr>
  );
}

SkillRow.propTypes = {
  attribute: PropTypes.string.isRequired,
  bonus: PropTypes.shape({
    sign: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  prof: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default SkillsTable;
