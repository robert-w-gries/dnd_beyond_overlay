import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';

function CharacterProfile(props) {
  const {
    removeProfile, profile, selectProfile, selected,
  } = props;

  const handleDelete = (event) => {
    removeProfile(profile);
    event.stopPropagation();
  };

  const selectedStyle = selected ? styles.selected : '';

  return (
    <button
      className={`${styles.CharacterProfile} ${selectedStyle}`}
      type="button"
      onClick={() => selectProfile(profile)}
      onKeyPress={() => selectProfile(profile)}
    >
      <button className={styles.RemoveProfile} type="button" onClick={handleDelete}>
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
  return <img className={styles.Avatar} src={image} alt="" />;
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
};

function CharacterTidbits(props) {
  const { level, name } = props;
  return (
    <div className={styles.CharacterTidbits}>
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
