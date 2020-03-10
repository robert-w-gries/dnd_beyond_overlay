import React, { useState, useEffect } from 'react';
import './Overlay.css';
import BeyondLoader from './BeyondLoader';
import Character from './character/Character';
import CharacterSelection from './CharacterSelection';
import Profile from '../models/profile';
import { Tabs, Tab } from './utils/Tabs';

function Overlay() {
  const [loadStatus, setLoadStatus] = useState('');
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState({ id: '' });
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    // Load saved user profiles
    setSavedProfiles([
      Profile({
        id: 20359926,
        name: 'Jives Thickbottome',
        level: '17',
      }),
      Profile({
        id: 20976116,
        name: 'Erwin Mossfoot',
        level: '16',
      }),
    ]);
  }, []);

  const selectCharacter = (profile) => {
    if (profile.id === selectedProfile.id) {
      return;
    }
    setLoadStatus('loading');
    setSelectedProfile(profile);
  };

  const onBeyondLoaded = (data) => {
    setSheet(data);
    setLoadStatus('done');
  };

  const defaultTab = selectedProfile.id ? 'Character Sheet' : 'Select Character';
  return (
    <div className="Overlay">
      <BeyondLoader
        selectedProfile={selectedProfile}
        onBeyondLoaded={onBeyondLoaded}
        onBeyondError={() => setLoadStatus('error')}
      />
      <Tabs defaultTab={defaultTab} className="OverlayTabs">
        <Tab title="Select Character">
          <CharacterSelection
            savedProfiles={savedProfiles}
            selectCharacter={selectCharacter}
            selectedProfile={selectedProfile}
          />
        </Tab>
        <Tab title="Character Sheet">
          <Character sheet={sheet} />
        </Tab>
      </Tabs>
      {loadStatus === 'loading' ? <Loading /> : null}
      {loadStatus === 'error' ? <div>Failed to load character</div> : null}
    </div>
  );
}

function Loading() {
  return (<div className="loader" />);
}

export default Overlay;
