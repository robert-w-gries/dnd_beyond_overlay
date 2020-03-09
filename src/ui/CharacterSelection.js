import React from 'react';

function CharacterSelection(props) {
  const handleClick = (id) => {
    props.setIsLoading(true);
    props.setCharId(id);
  };

  const profiles = [20359926, 20976116].map((id) => (
    <div key={id.toString()} onClick={() => handleClick(id)}>
      {id}
    </div>
  ));
  return (
    <div className="grid twocol">
      {profiles}
    </div>
  );
}

export default CharacterSelection;
