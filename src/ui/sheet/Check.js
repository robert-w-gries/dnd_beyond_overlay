// eslint-disable-next-line no-redeclare
/* global chrome */
import React from 'react';
import PropTypes from 'prop-types';

function Check(props) {
  const {
    children, bonus, damage, dice, name,
  } = props;

  const sendRoll = () => {
    chrome.runtime.sendMessage({
      name,
      check: {
        dice,
        bonus,
      },
      damage,
    });
  };

  return React.Children.map(children, (child) => React.cloneElement(child, { onClick: sendRoll }));
}

export default Check;
