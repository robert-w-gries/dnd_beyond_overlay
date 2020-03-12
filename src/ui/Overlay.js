import React, { useState, useEffect } from 'react';
import './Overlay.css';
import BeyondLoader from './BeyondLoader';
import Character from './character/Character';
import CharacterSelection from './CharacterSelection';
import ProfileModel from '../models/profile';
import { Tabs, Tab } from './Tabs';

function Overlay() {
  const [loadStatus, setLoadStatus] = useState({ status: '' });
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState({ id: '' });
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    // Load saved user profiles
    setSavedProfiles([
      ProfileModel({
        avatar: '',
        id: 20359926,
        name: 'Jives Thickbottome',
        level: 17,
      }),
      ProfileModel({
        avatar: '',
        id: 20359926,
        name: 'This is a very long name that cant be seen at this point',
        level: 17,
      }),
      ProfileModel({
        avatar: '',
        id: 20976116,
        name: 'Erwin Mossfoot',
        level: 16,
      }),
      ProfileModel({
        avatar: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/8965/197/240/150/637186813156282102.jpeg',
        id: 21275516,
        name: 'Lilia',
        level: 17,
      }),
    ]);
  }, []);

  const selectCharacter = (profile) => {
    if (profile.id === selectedProfile.id) {
      return;
    }
    setLoadStatus({ status: 'loading' });
    setSelectedProfile(profile);
  };

  const onBeyondLoaded = (data) => {
    setSheet(data);
    setLoadStatus({ status: 'done' });
  };

  const sheetContent = () => {
    let content = <div>Please select a character.</div>;
    if (loadStatus.status === 'loading') {
      content = <div className="loader" />;
    } else if (loadStatus.status === 'error') {
      content = (
        <div>
          <div>Failed to load character.</div>
          <div>{`Error: ${loadStatus.errorMsg}`}</div>
        </div>
      );
    } else if (loadStatus.status === 'done') {
      content = <Character sheet={sheet} />;
    }
    return content;
  };

  return (
    <div className="Overlay">
      <BeyondLoader
        selectedProfile={selectedProfile}
        onBeyondLoaded={onBeyondLoaded}
        onBeyondError={(errorMsg) => setLoadStatus({ status: 'error', errorMsg })}
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
          {sheetContent()}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Overlay;
