import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';

function Profiles(props) {
  const {
    onRemoveProfile, onSelectProfile, profiles, currentProfile,
  } = props;

  if (!profiles) {
    return null;
  }

  const profileViews = [];
  profiles.forEach((profileType, id) => {
    const onRemoved = (event) => {
      onRemoveProfile(id);
      event.stopPropagation();
    };

    const statusToProfiles = ({
      loaded: (
        <CharacterProfile
          onRemoved={onRemoved}
          selected={currentProfile && id === currentProfile.id}
          profile={profileType.profile}
          selectProfile={onSelectProfile}
        />
      ),
      loading: (
        <LoadingProfile id={id} onRemoved={onRemoved} />
      ),
      error: (
        <ErrorProfile id={id} onRemoved={onRemoved} />
      ),
    });

    profileViews.push(statusToProfiles[profileType.status]);
  });

  return (
    <div className={styles.Profiles}>
      {profileViews}
    </div>
  );
}

const profileType = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

Profiles.propTypes = {
  onRemoveProfile: PropTypes.func.isRequired,
  onSelectProfile: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape({
    status: PropTypes.string.isRequired,
    profile: PropTypes.shape(profileType).isRequired,
  })).isRequired,
  currentProfile: PropTypes.shape(profileType),
};

Profiles.defaultProps = {
  currentProfile: {
    avatar: '',
    id: null,
    level: null,
    name: '',
  },
};

function Profile(props) {
  const {
    name, avatar, level, error, loading,
  } = props;

  const image = avatar || 'https://www.dndbeyond.com/Content/Skins/Waterdeep/images/characters/default-avatar-builder.png';

  return ([
    <Avatar image={image} error={error} loading={loading} />,
    <CharacterTidbits name={name} level={level} />,
  ]);
}

function CharacterProfile(props) {
  const {
    onRemoved, profile, selectProfile, selected,
  } = props;

  const [loading, setLoading] = useState(false);

  const selectedStyle = selected ? styles.selected : '';

  return (
    <button
      className={`${styles.CharacterProfile} ${selectedStyle}`}
      type="button"
      onClick={() => {
        setLoading(true);
        selectProfile(profile);
      }}
      onKeyPress={() => selectProfile(profile)}
    >
      <RemoveProfile onRemoved={onRemoved} />
      <Profile
        name={profile.name}
        avatar={profile.avatar}
        level={profile.level}
        loading={loading}
      />
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

function LoadingProfile(props) {
  const { id, onRemoved } = props;

  return (
    <div className={styles.LoadingProfile}>
      <RemoveProfile onRemoved={onRemoved} />
      <Profile
        name={`ID: ${id}`}
        loading
      />
    </div>
  );
}

function ErrorProfile(props) {
  const { id, onRemoved } = props;

  return (
    <div className={styles.ErrorProfile}>
      <RemoveProfile onRemoved={onRemoved} />
      <Profile
        name={`ID: ${id}`}
        error
      />
    </div>
  );
}

function RemoveProfile(props) {
  const { onRemoved } = props;

  return (
    <button className={styles.RemoveProfile} type="button" onClick={onRemoved}>
      &#128465;
    </button>
  );
}

function Avatar(props) {
  const {
    image, loading,
  } = props;
  return (
    <div className={styles.AvatarWrapper}>
      {loading ? <div className={styles.Loader} /> : null}
      <img className={styles.Avatar} src={image} alt="" />
    </div>
  );
}

Avatar.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

function CharacterTidbits(props) {
  const { level, name } = props;
  return (
    <div className={styles.CharacterTidbits}>
      <div>{name}</div>
      <div>{level ? `Level ${level}` : ''}</div>
    </div>
  );
}

CharacterTidbits.propTypes = {
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Profiles;
