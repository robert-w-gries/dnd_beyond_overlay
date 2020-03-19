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

Check.propTypes = {
  children: PropTypes.element.isRequired,
  bonus: PropTypes.string.isRequired,
  damage: PropTypes.string,
  dice: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Check.defaultProps = {
  damage: '--',
};

export default Check;
