import React from 'react';
import PropTypes from 'prop-types';

function CharacterSelection(props) {
  const { savedProfiles, selectCharacter, selectedProfile } = props;

  return (
    <div>
      <button type="button">Add A Character</button>
      <SavedProfiles savedProfiles={savedProfiles} selectCharacter={selectCharacter} selectedProfile={selectedProfile} />
    </div>
  );
}

CharacterSelection.propTypes = {
  selectCharacter: PropTypes.func.isRequired,
};

function SavedProfiles(props) {
  const { savedProfiles, selectCharacter, selectedProfile } = props;
  if (!savedProfiles) {
    return null;
  }

  const profiles = savedProfiles.map((profile) => {
    const { id } = profile;
    return (
      <CharacterProfile
        key={id.toString()}
        selected={id === selectedProfile.id}
        profile={profile}
        selectCharacter={() => selectCharacter(profile)}
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
  const { profile, selectCharacter, selected } = props;
  return (
    <button
      className="CharacterProfile"
      type="button"
      style={selected ? { outline: '3px solid red' } : null}
      onClick={selectCharacter}
      onKeyPress={selectCharacter}
    >
      <Avatar image={profile.avatar} />
      <CharacterTidbits name={profile.name} level={profile.level} />
    </button>
  );
}

function Avatar(props) {
  const { image } = props;
  return <img className="Avatar" src={image} alt="" />;
}

function CharacterTidbits(props) {
  const { level, name } = props;
  return (
    <div className="CharacterTidbits">
      <div>{name}</div>
      <div>{`Level ${level}`}</div>
    </div>
  );
}

export default CharacterSelection;
