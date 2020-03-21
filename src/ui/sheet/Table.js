import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
  const { tableClass, cols, rows } = props;

  const colgroup = cols.map(({ width }) => <col style={{ width: `${width}%` }} />);
  const headers = cols.map(({ header, className: headerClass }) => ((
    <th className={headerClass}>{header}</th>
  )));
  return (
    <div className={tableClass}>
      <table>
        <colgroup>
          {colgroup}
        </colgroup>
        <tr>
          {headers}
        </tr>
        {rows}
      </table>
    </div>
  );
}

Table.propTypes = {
  tableClass: PropTypes.string.isRequired,
  cols: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default Table;
