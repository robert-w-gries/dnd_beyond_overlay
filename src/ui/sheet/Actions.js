import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/actions.module.css';
import Check from './Check';
import RollModel from '../../models/roll';
import Table from './Table';

function ActionsTable({ actions, characterName }) {
  const actionRows = actions.map(({
    name: actionName, hit, range, damage,
  }) => ((
    <Check
      key={actionName}
      roll={RollModel(characterName, actionName, (roll) => ({
        roll: roll(`1d20 ${hit.sign} ${hit.num || 0}`),
        damage: roll(damage || '0'),
      }))}>
      <ActionRow
        key={actionName}
        bonus={`${hit.sign}${hit.num}`}
        name={actionName}
        range={range}
        damage={damage} />
    </Check>
  )));

  return (
    <Table
      rows={actionRows}
      tableClass={styles.ActionsTable}
      cols={[
        { header: 'Action', width: 47, className: styles.actionName },
        { header: 'Range', width: 19, className: styles.range },
        { header: 'Hit', width: 14, className: styles.bonus },
        { header: 'Damage', width: 20, className: styles.damage },
      ]} />
  );
}

ActionsTable.propTypes = {
  characterName: PropTypes.string.isRequired,
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

function ActionRow(props) {
  const {
    name, bonus, range, damage, onCheck,
  } = props;
  return (
    <tr className={styles.check} onClick={onCheck}>
      <td className={styles.actionName}>{name}</td>
      <td className={styles.range}>{range.long ? `${range.range} ${range.long}` : range.range}</td>
      <td className={styles.bonus}>{bonus ? bonus : '--'}</td>
      <td className={styles.damage}>{damage ? damage: '--'}</td>
    </tr>
  );
}

ActionRow.propTypes = {
  name: PropTypes.string.isRequired,
  bonus: PropTypes.string.isRequired,
  range: PropTypes.shape({
    range: PropTypes.string.isRequired,
    long: PropTypes.string,
    reach: PropTypes.bool.isRequired,
  }).isRequired,
  damage: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default ActionsTable;
