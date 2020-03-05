import React from 'react';
import PropTypes from 'prop-types';

function Actions() {
  return (
    <table className="table Actions">
      <tr>
        <th>Action</th>
        <th>Range</th>
        <th>Hit</th>
        <th>Damage</th>
      </tr>
      <Action title="Example Action" />
      <Action title="Example Action" />
      <Action title="Example Action" />
    </table>
  );
}

function Action(props) {
  const { title } = props;
  return (
    <tr className="action">
      <td>{title}</td>
      <td>30</td>
      <td>+10</td>
      <td>1d6+5</td>
    </tr>
  );
}

Action.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Actions;
