// eslint-disable-next-line no-redeclare
/* global chrome */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddProfile from './AddProfile';
import BeyondLoader from './BeyondLoader';
import Profiles from './Profile';

const LoadedProfile = (profileModel) => ({
  status: 'loaded',
  profile: profileModel,
});

const ErrorProfile = () => ({
  status: 'error',
});

const LoadingProfile = () => ({
  status: 'loading',
});

function ProfileSelection(props) {
  const { onCharacterReady } = props;
  const [profiles, setProfiles] = useState(new Map());
  const [currentProfile, setCurrentProfile] = useState(null);

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

    // Once the loading is complete, either mark it as `loaded` or `error`
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
      <AddProfile addProfile={onAddProfile} />
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
