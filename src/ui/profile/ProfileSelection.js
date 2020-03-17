// eslint-disable-next-line no-redeclare
/* global chrome */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';
import AddProfile from './AddProfile';
import BeyondLoader from './BeyondLoader';
import CharacterProfile from './CharacterProfile';

function ProfileSelection(props) {
  const { onCharacterReady } = props;
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    chrome.storage.local.get('savedProfiles', (result) => {
      setSavedProfiles(result.savedProfiles || []);
    });
  }, []);

  const profileOperations = {
    add: (profilePromise) => {
      //TODO:add empty profile to saved profiles list
      profilePromise.then((profile) => {
        //TODO: replace info of empty list with fetched data
        setSavedProfiles((list) => {
          const newList = [...list, profile];
          chrome.storage.local.set({ savedProfiles: newList });
          return newList;
        });
      });
    },
    remove: (profile) => {
      if (profile === currentProfile) {
        setCurrentProfile(null);
      }
      setSavedProfiles((list) => {
        const newList = list.filter((p) => profile.id !== p.id);
        chrome.storage.local.set({ savedProfiles: newList });
        return newList;
      });
    },
    select: (profile) => {
      if (currentProfile && profile.id === currentProfile.id) {
        return;
      }
      setCurrentProfile(profile);
    },
  };

  const onCharacterLoaded = (loadingPromise) => {
    onCharacterReady(loadingPromise.then((result) => {
      if (!result.success) {
        return Promise.reject(result.errorMsg);
      }
      return result.data;
    }));
  };

  return (
    <div>
      <BeyondLoader
        currentProfile={currentProfile}
        onBeyondLoaded={onCharacterLoaded}
      />
      <AddProfile addProfile={profileOperations.add} savedProfiles={savedProfiles} />
      <SavedProfiles
        profileOperations={profileOperations}
        savedProfiles={savedProfiles}
        currentProfile={currentProfile}
      />
    </div>
  );
}

ProfileSelection.propTypes = {
  onCharacterReady: PropTypes.func.isRequired,
};

function SavedProfiles(props) {
  const { profileOperations, savedProfiles, currentProfile } = props;
  if (!savedProfiles) {
    return null;
  }

  const profiles = savedProfiles.map((profile) => {
    const { id } = profile;
    return (
      <CharacterProfile
        key={id.toString()}
        removeProfile={profileOperations.remove}
        selected={currentProfile && id === currentProfile.id}
        profile={profile}
        selectProfile={profileOperations.select}
      />
    );
  });

  return (
    <div className={styles.SavedProfiles}>
      {profiles}
    </div>
  );
}

const profileType = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

SavedProfiles.propTypes = {
  profileOperations: PropTypes.shape({
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  }).isRequired,
  savedProfiles: PropTypes.arrayOf(PropTypes.shape(profileType)).isRequired,
  currentProfile: profileType,
};

SavedProfiles.defaultProps = {
  currentProfile: {
    avatar: '',
    id: null,
    level: null,
    name: '',
  },
};

export default ProfileSelection;
