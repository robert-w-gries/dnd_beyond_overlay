import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/actions.module.css';
import Check from './Check';

function Actions(props) {
  const { actions } = props;
  const actionElements = actions.map((actionObj) => {
    const {
      name, hit, range, damage,
    } = actionObj;
    return (
      <Action
        key={name}
        bonus={`${hit.sign}${hit.num}`}
        name={name}
        range={range}
        damage={damage}
      />
    );
  });
  return (
    <div className={styles.ActionsTableWrapper}>
      <table>
        <colgroup>
          <col style={{ width: '47%' }} />
          <col style={{ width: '19%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        <tr>
          <th className={styles.bonusName}>Action</th>
          <th>Range</th>
          <th>Hit</th>
          <th>Damage</th>
        </tr>
        {actionElements}
      </table>
    </div>
  );
}

Actions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    hit: PropTypes.shape({
      sign: PropTypes.string.isRequired,
      num: PropTypes.string.isRequired,
    }).isRequired,
    range: PropTypes.shape({
      range: PropTypes.string.isRequired,
      long: PropTypes.string,
      reach: PropTypes.bool.isRequired,
    }).isRequired,
    damage: PropTypes.string.isRequired,
  })).isRequired,
};

function Action(props) {
  const {
    name, bonus, range, damage,
  } = props;
  return (
    <Check dice="1d20" bonus={bonus} damage={damage} name={name}>
      <tr className={styles.check}>
        <td className={styles.actionName}>{name}</td>
        <td className={styles.range}>{range.long ? `${range.range} ${range.long}` : range.range}</td>
        <td className={styles.bonus}>{bonus}</td>
        <td className={styles.damage}>{damage}</td>
      </tr>
    </Check>
  );
}

Action.propTypes = {
  name: PropTypes.string.isRequired,
  bonus: PropTypes.string.isRequired,
  range: PropTypes.shape({
    range: PropTypes.string.isRequired,
    long: PropTypes.string,
    reach: PropTypes.bool.isRequired,
  }).isRequired,
  damage: PropTypes.string.isRequired,
};

export default Actions;
