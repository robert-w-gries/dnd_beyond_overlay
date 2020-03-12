import React from 'react';
import PropTypes from 'prop-types';

function Actions(props) {
  const { actions } = props;
  const actionElements = actions.map((actionObj) => {
    const {
      name, hit, range, damage,
    } = actionObj;
    return <Action key={name} bonus={`${hit.sign}${hit.num}`} name={name} range={range} damage={damage} />;
  });
  return (
    <table className="table Actions">
      <colgroup>
        <col style={{ width: '50%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <tr>
        <th className="ActionNameCol">Action</th>
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
    <tr className="action">
      <td className="ActionNameCol ActionName">{name}</td>
      <td className="ActionRange dataText">{range.long ? `${range.range} ${range.long}` : range.range}</td>
      <td className="dataText">{bonus}</td>
      <td className="dataText">{damage}</td>
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
