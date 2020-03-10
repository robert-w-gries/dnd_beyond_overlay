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
        id: 20359926,
        name: 'This is a very long name that cant be seen at this point',
        level: '17',
      }),
      Profile({
        id: 20976116,
        name: 'Erwin Mossfoot',
        level: '16',
      }),
      Profile({
        avatar: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/8965/197/240/150/637186813156282102.jpeg',
        id: 21275516,
        name: 'Lilia',
        level: '17',
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

  return (
    <div className="Overlay">
      <BeyondLoader
        selectedProfile={selectedProfile}
        onBeyondLoaded={onBeyondLoaded}
        onBeyondError={() => setLoadStatus('error')}
      />
      <Tabs defaultTab="Select Character" className="OverlayTabs">
        <Tab title="Select Character">
          <CharacterSelection
            savedProfiles={savedProfiles}
            selectCharacter={selectCharacter}
            selectedProfile={selectedProfile}
          />
        </Tab>
        <Tab title="Character Sheet">
          {loadStatus === 'loading' ? <Loading /> : <Character sheet={sheet} /> }
        </Tab>
      </Tabs>
      {loadStatus === 'error' ? <div>Failed to load character</div> : null}
    </div>
  );
}

function Loading() {
  return (<div className="loader" />);
}

export default Overlay;
