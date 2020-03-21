// eslint-disable-next-line no-redeclare
/* global chrome */
import React from 'react';
import PropTypes from 'prop-types';

function Check(props) {
  const {
    children, roll,
  } = props;

  const sendRoll = () => {
    chrome.runtime.sendMessage(roll);
  };

  return React.Children.map(children, (child) => React.cloneElement(child, { onCheck: sendRoll }));
}

Check.propTypes = {
  children: PropTypes.element.isRequired,
  roll: PropTypes.shape({
    characterName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    roll: PropTypes.string.isRequired,
    damage: PropTypes.string,
  }),
};

Check.defaultProps = {
  damage: '--',
};

export default Check;
