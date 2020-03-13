import React from 'react';
import PropTypes from 'prop-types';

function CharacterProfile(props) {
  const {
    removeProfile, profile, selectProfile, selected,
  } = props;

  const handleDelete = (event) => {
    if (event.target !== this) return;
    removeProfile(profile);
  };

  return (
    <button
      className="CharacterProfile"
      type="button"
      style={selected ? { outline: '4px solid red' } : null}
      onClick={() => selectProfile(profile)}
      onKeyPress={() => selectProfile(profile)}
    >
      <button className="deleteProfileButton" type="button" onClick={handleDelete}>
        &#128465;
      </button>
      <Avatar image={profile.avatar} />
      <CharacterTidbits name={profile.name} level={profile.level} />
    </button>
  );
}

CharacterProfile.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  removeProfile: PropTypes.func.isRequired,
  selectProfile: PropTypes.func.isRequired,
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
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default CharacterProfile;
