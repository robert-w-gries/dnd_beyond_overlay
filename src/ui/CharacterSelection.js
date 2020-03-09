import React from 'react';
import PropTypes from 'prop-types';

function CharacterSelection(props) {
  const { setCharId, setIsLoading } = props;
  const handleClick = (id) => {
    setIsLoading(true);
    setCharId(id);
  };

  const profiles = [20359926, 20976116].map((id) => (
    <div key={id.toString()} onClick={() => handleClick(id)} onKeyPress={() => handleClick(id)}>
      {id}
    </div>
  ));
  return (
    <div className="grid twocol">
      {profiles}
    </div>
  );
}

CharacterSelection.propTypes = {
  setCharId: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default CharacterSelection;
