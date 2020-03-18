import React from 'react';
import PropTypes from 'prop-types';
import sheetStyles from '../styles/sheet.module.css';
import actionsStyles from '../styles/actions.module.css';

function Actions(props) {
  const { actions } = props;
  const actionElements = actions.map((actionObj) => {
    const {
      name, hit, range, damage,
    } = actionObj;
    return <Action key={name} bonus={`${hit.sign}${hit.num}`} name={name} range={range} damage={damage} />;
  });
  return (
    <table className={actionsStyles.ActionsTable}>
      <colgroup>
        <col style={{ width: '46%' }} />
        <col style={{ width: '16%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '23%' }} />
      </colgroup>
      <tr>
        <th className={actionsStyles.NameCol}>Action</th>
        <th>Range</th>
        <th>Hit</th>
        <th>Damage</th>
      </tr>
      {actionElements}
    </table>
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
    <tr className={sheetStyles.check}>
      <td className={actionsStyles.NameCol}>{name}</td>
      <td className={actionsStyles.RangeCol}>{range.long ? `${range.range} ${range.long}` : range.range}</td>
      <td className={actionsStyles.BonusCol}>{bonus}</td>
      <td className={actionsStyles.DamageCol}>{damage}</td>
    </tr>
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
