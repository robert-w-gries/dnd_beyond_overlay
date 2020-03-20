import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';

function Profiles(props) {
  const {
    currentProfile, profiles, onRemoveProfile, onSelectProfile,
  } = props;

  if (!profiles) {
    return null;
  }

  const profileViews = [];
  profiles.forEach((profileType, id) => {
    profileViews.push((
      <CharacterProfile
        profile={profileType.profile}
        selected={currentProfile && currentProfile.id === id}
        status={profileType.status}
        onRemoved={onRemoveProfile}
        onSelected={onSelectProfile}
      />
    ));
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

function CharacterProfile(props) {
  const {
    profile, selected, status, onRemoved, onSelected,
  } = props;

  const onRemove = (event) => {
    event.stopPropagation();
    onRemoved(profile.id);
  };

  const onSelect = () => {
    onSelected(profile);
  };

  const wrapper = (content) => {
    if (status === 'loaded') {
      return (
        <SelectableWrapper onSelect={onSelect} selected={selected}>
          {content}
        </SelectableWrapper>
      );
    }

    return (
      <div className={styles.CharacterProfile}>
        {content}
      </div>
    );
  };

  const tidbits = (() => {
    if (status === 'loading' && !profile.name) {
      return { name: `ID: ${profile.id}`, level: '' };
    }

    return { name: profile.name, level: profile.level };
  })();

  return wrapper([
    <ProfileButtons onRemove={onRemove} onRetry={onSelect} error={status === 'error'} />,
    <Avatar image={profile.avatar} error={status === 'error'} loading={status === 'loading'} />,
    <CharacterTidbits name={tidbits.name} level={tidbits.level} />,
  ]);
}

CharacterProfile.propTypes = {
  profile: PropTypes.shape(profileType).isRequired,
  onRemoved: PropTypes.func.isRequired,
  selectProfile: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

function SelectableWrapper(props) {
  const { selected, onSelect } = props;
  const selectedStyle = selected ? styles.selected : '';
  return (
    <button
      type="button"
      className={`${styles.SelectableProfile} ${selectedStyle}`}
      onClick={onSelect}
      onKeyPress={onSelect}
    >
      {props.children}
    </button>
  );
}

function ProfileButtons(props) {
  const { error, onRemove, onRetry } = props;

  const retryButton = ((
    <button type="button" className={styles.RetryButton} onClick={onRetry}>
      <span>&#8634;</span>
    </button>
  ));

  return (
    <div className={styles.ProfileButtons}>
      <button className={styles.RemoveButton} type="button" onClick={onRemove}>
        <span>&#128465;</span>
      </button>
      {error ? retryButton : null}
    </div>
  );
}

ProfileButtons.propTypes = {
  onRemoved: PropTypes.func.isRequired,
};

function Avatar(props) {
  const {
    image, error, loading,
  } = props;

  const src = image || 'https://www.dndbeyond.com/Content/Skins/Waterdeep/images/characters/default-avatar-builder.png';
  return (
    <div className={styles.AvatarWrapper}>
      {loading ? <div className={styles.Loader} /> : null}
      {error ? <div className={styles.ErrorMarker}>X</div> : null}
      <img className={styles.Avatar} src={src} alt="" />
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
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
