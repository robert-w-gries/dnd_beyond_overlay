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
        <col style={{ width: '40%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '20%' }} />
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

function Action(props) {
  const {
    name, bonus, range, damage,
  } = props;
  return (
    <tr className="action">
      <td className="ActionNameCol ActionName">{name}</td>
      <td className="dataText">{range}</td>
      <td className="dataText">{bonus}</td>
      <td className="dataText">{damage}</td>
    </tr>
  );
}

Action.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Actions;
