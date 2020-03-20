// eslint-disable-next-line no-redeclare
/* global chrome */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';
import AddProfile from './AddProfile';
import BeyondLoader from './BeyondLoader';
import Profiles from './Profile';

const LoadedProfile = (profileModel) => ({
  status: 'loaded',
  profile: profileModel,
});

const ErrorProfile = (error, profile) => ({
  status: 'error',
  error,
  profile,
});

const LoadingProfile = () => ({
  status: 'loading',
});

function ProfileSelection(props) {
  const { onCharacterReady } = props;
  const [profiles, setProfiles] = useState(new Map());
  const [currentProfile, setCurrentProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    chrome.storage.local.get('savedProfiles', (result) => {
      if (!result.savedProfiles) return;

      const keyPairs = result.savedProfiles.map((profile) => [profile.id, LoadedProfile(profile)]);
      setProfiles(new Map(keyPairs));
    });
  }, []);

  const onAddProfile = (id, profilePromise) => {
    if (profiles.has(id)) {
      throw new Error('ALREADY_EXISTS');
    }

    // Add profile as a placeholder `LoadingProfile` first
    setProfiles((map) => {
      const newMap = new Map(Array.from(map.entries()));
      newMap.set(id, LoadingProfile());
      return newMap;
    });

    // Once the profile is added is complete, either mark it as `loaded` or `error`
    profilePromise.then((profile) => {
      setProfiles((map) => {
        const newMap = new Map(Array.from(map.entries()));
        newMap.set(id, LoadedProfile(profile));

        // Append the loaded profile to list of saved profiles
        chrome.storage.local.get('savedProfiles', (result) => {
          const savedList = result.savedProfiles ? [...result.savedProfiles, profile] : [profile];
          chrome.storage.local.set({ savedProfiles: savedList });
        });

        return newMap;
      });
    }).catch((err) => {
      // Update the profile to indicate it errored
      setProfiles((map) => {
        const newMap = new Map(Array.from(map.entries()));
        newMap.set(id, ErrorProfile());
        return newMap;
      });
      setErrorMessage(err.message);
      throw err;
    });
  };

  const onRemoveProfile = (id) => {
    if (currentProfile && id === currentProfile.id) {
      setCurrentProfile(null);
    }

    setProfiles((map) => {
      const newMap = new Map(Array.from(map.entries()));
      newMap.delete(id);

      // Remove the profile from local storage if it was saved
      chrome.storage.local.get('savedProfiles', (result) => {
        if (!result.savedProfiles) return;
        const newList = result.savedProfiles.filter((profile) => profile.id !== id);
        chrome.storage.local.set({ savedProfiles: newList });
      });

      return newMap;
    });
  };

  const onSelectProfile = (profile) => {
    if (currentProfile && profile.id === currentProfile.id) {
      return;
    }
    setCurrentProfile(profile);
  };

  const onCharacterLoaded = (loadingPromise) => {
    // Check if character sheet was successfully loaded
    onCharacterReady(loadingPromise.then((result) => {
      if (!result.success) {
        throw new Error(result.errorMsg);
      }
      return result.data;
    }).catch((err) => {
      setCurrentProfile((profile) => {
        setProfiles((map) => {
          const newMap = new Map(Array.from(map.entries()));
          newMap.set(profile.id, ErrorProfile(err.message, profile));
          return newMap;
        });
        return null;
      });
      setErrorMessage(err.message);
      return Promise.reject(err);
    }));
  };

  return (
    <div>
      <BeyondLoader
        currentProfile={currentProfile}
        onBeyondLoaded={onCharacterLoaded}
      />
      <AddProfile addProfile={onAddProfile} />
      {errorMessage ? <div className={styles.ErrorMsg}>{`Error: ${errorMessage}`}</div> : null}
      <Profiles
        onRemoveProfile={onRemoveProfile}
        onSelectProfile={onSelectProfile}
        profiles={profiles}
        currentProfile={currentProfile}
      />
    </div>
  );
}

ProfileSelection.propTypes = {
  onCharacterReady: PropTypes.func.isRequired,
};

export default ProfileSelection;
