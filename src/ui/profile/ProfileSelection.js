// eslint-disable-next-line no-redeclare
/* global chrome */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';
import beyond from '../../utils/beyond';
import AddProfile from './AddProfile';
import Profiles from './Profile';

const LoadedProfile = (profileModel) => ({
  status: 'loaded',
  profile: profileModel,
});

const ErrorProfile = (profile, onRetry) => ({
  status: 'error',
  profile,
  onRetry,
});

const LoadingProfile = (profile) => ({
  status: 'loading',
  profile,
});

function ProfileSelection({ setSheet }) {
  const [currentId, setCurrentId] = useState(null);
  const [loadedSheets, setLoadedSheets] = useState({});
  const [profiles, setProfiles] = useState(new Map());
  const [errorMessage, setErrorMessage] = useState('');

  //TODO Replace with useChromeLocalStorage hook 
  useEffect(() => {
    chrome.storage.local.get('savedProfiles', (result) => {
      if (!result.savedProfiles) return;

      const keyPairs = result.savedProfiles.map((profile) => [profile.id, LoadedProfile(profile)]);
      setProfiles(new Map(keyPairs));
    });
  }, []);

  const addProfile = async (id) => {
    if (profiles.has(id)) {
      setErrorMessage('Character already added.');
      return;
    }

    setErrorMessage('');
    // Add placeholder profile with id until loaded
    const tempProfile = LoadingProfile({ id });
    setProfiles((map) => new Map([...map, [id, tempProfile]]));

    let characterData;
    try {
      characterData = await beyond.fetchCharacter(id);
    } catch (err) {
      const errProfile = ErrorProfile({ id }, () => addProfile(id));
      setProfiles((map) => new Map([...map, [id, errProfile]]));
      setErrorMessage(err.message);
      return;
    }

    const profile = beyond.parseProfile(id, characterData);
    setProfiles((map) => {
      // Append the loaded profile to list of saved profiles
      chrome.storage.local.get('savedProfiles', (result) => {
        const savedList = result.savedProfiles ? [...result.savedProfiles, profile] : [profile];
        chrome.storage.local.set({ savedProfiles: savedList });
      });

      return new Map([...map, [id, LoadedProfile(profile)]]);
    });
  };

  const onRemoveProfile = (id) => {
    if (id === currentId) {
      setCurrentId(null);
    }

    setErrorMessage('');

    setProfiles((map) => {
      // Remove the profile from local storage if it was saved
      chrome.storage.local.get('savedProfiles', (result) => {
        if (!result.savedProfiles) return;
        const newList = result.savedProfiles.filter((profile) => profile.id !== id);
        chrome.storage.local.set({ savedProfiles: newList });
      });

      const newMap = new Map([...map]);
      newMap.delete(id);
      return newMap;
    });
  };

  const selectProfile = async (profile) => {
    if (profile.id === currentId) {
      return;
    }
    setProfiles((map) => {
      const newMap = new Map([...map]);
      newMap.set(profile.id, LoadingProfile(profile));
      return newMap;
    });
    setErrorMessage('');
    setCurrentId(profile.id);
    let sheetData;
    try {
      sheetData = await beyond.fetchCharacter(profile.id);
    } catch (err) {
      setCurrentId(null);
      const errorProfile = ErrorProfile(profile, () => selectProfile(profile));
      setProfiles((map) => [...map, [profile.id, errorProfile]]);
      setErrorMessage(err.message);
    }
    beyond.parseSheet(sheetData);
  };

  const errorBox = (errorStr) => {
    const prepend = `Error: ${errorStr}`;
    const strWrappers = prepend.split('\n').map((str) => <p>{str}</p>);
    return (
      <div className={styles.ErrorMsg}>
        {strWrappers}
      </div>
    );
  };

  return (
    <div>
      <AddProfile
        addProfile={addProfile}
        clearError={() => setErrorMessage('')}
        onError={(errMsg) => setErrorMessage(errMsg)} />
      {errorMessage ? errorBox(errorMessage) : null}
      <Profiles
        currentProfileId={currentId}
        profiles={profiles}
        onRemoveProfile={onRemoveProfile}
        selectProfile={selectProfile} />
    </div>
  );
}

ProfileSelection.propTypes = {
  onCharacterReady: PropTypes.func.isRequired,
};

export default ProfileSelection;
