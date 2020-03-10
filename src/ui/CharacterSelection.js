import React from 'react';
import PropTypes from 'prop-types';

const sharedPropTypes = {
  savedProfiles: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  selectCharacter: PropTypes.func.isRequired,
  selectedProfile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const sharedDefaultProps = {
  selectedProfile: {
    avatar: '',
    id: null,
    level: '',
    name: '',
  },
};

function CharacterSelection(props) {
  const { savedProfiles, selectCharacter, selectedProfile } = props;

  return (
    <div>
      <button type="button">Add A Character</button>
      <SavedProfiles
        savedProfiles={savedProfiles}
        selectCharacter={selectCharacter}
        selectedProfile={selectedProfile}
      />
    </div>
  );
}

CharacterSelection.propTypes = sharedPropTypes;
CharacterSelection.defaultProps = sharedDefaultProps;

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

SavedProfiles.propTypes = sharedPropTypes;
SavedProfiles.defaultProps = sharedDefaultProps;

function CharacterProfile(props) {
  const { profile, selectCharacter, selected } = props;
  return (
    <button
      className="CharacterProfile"
      type="button"
      style={selected ? { outline: '4px solid red' } : null}
      onClick={selectCharacter}
      onKeyPress={selectCharacter}
    >
      <Avatar image={profile.avatar} />
      <CharacterTidbits name={profile.name} level={profile.level} />
    </button>
  );
}

CharacterProfile.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  selectCharacter: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

function Avatar(props) {
  const { image } = props;
  return <img className="Avatar" src={image} alt="" />;
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
};

function CharacterTidbits(props) {
  const { level, name } = props;
  return (
    <div className="CharacterTidbits">
      <div>{name}</div>
      <div>{`Level ${level}`}</div>
    </div>
  );
}

CharacterTidbits.propTypes = {
  level: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CharacterSelection;
