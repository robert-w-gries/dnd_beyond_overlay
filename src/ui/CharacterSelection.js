import React from 'react';
import PropTypes from 'prop-types';

function CharacterSelection(props) {
  const { savedProfiles, selectCharacter } = props;

  return (
    <div>
      <div>Add A Character</div>
      <SavedProfiles savedProfiles={savedProfiles} selectCharacter={selectCharacter} />
    </div>
  );
}

CharacterSelection.propTypes = {
  /* savedProfiles: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired, */
  selectCharacter: PropTypes.func.isRequired,
};

function SavedProfiles(props) {
  const { savedProfiles, selectCharacter } = props;
  if (!savedProfiles) {
    return null;
  }

  const profiles = savedProfiles.map((char) => {
    const { id, name, level } = char;
    return (
      <CharacterProfile
        key={id.toString()}
        name={name}
        level={level}
        selectCharacter={() => selectCharacter(id)}
      />
    );
  });

  return (
    <div className="grid twocol">
      {profiles}
    </div>
  );
}

function CharacterProfile(props) {
  const { level, name, selectCharacter } = props;
  return (
    <button className="CharacterProfile" type="button" onClick={selectCharacter} onKeyPress={selectCharacter}>
      <Avatar />
      <CharacterTidbits name={name} level={level} />
    </button>
  );
}

function Avatar() {
  return <div>Avatar</div>;
}

function CharacterTidbits(props) {
  const { level, name } = props;
  return (
    <div>
      <div>{name}</div>
      <div>{`Level ${level}`}</div>
    </div>
  );
}

export default CharacterSelection;
