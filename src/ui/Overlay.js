import React, { useState, useEffect } from 'react';
import './Overlay.css';
import BeyondLoader from './BeyondLoader';
import Character from './sheet/Character';
import CharacterSelection from './profile/CharacterSelection';
import ProfileModel from '../models/profile';
import { Tabs, Tab } from './Tabs';

function Overlay() {
  const [loadStatus, setLoadStatus] = useState(null);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
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

  const profileOperations = {
    add: (profilePromise) => {
      profilePromise.then((profile) => {
        setSavedProfiles((list) => [...list, profile]);
      });
    },
    remove: (profile) => {
      setSheet(null);
      setSelectedProfile(null);
      setSavedProfiles((list) => list.filter((p) => profile.id !== p.id))
    },
    select: (profile) => {
      if (selectedProfile && profile.id === selectedProfile.id) {
        return;
      }
      setLoadStatus({ status: 'loading' });
      setSelectedProfile(profile);
    },
  };

  const sheetContent = () => {
    let content;
    if (loadStatus.status === 'loading') {
      content = <div className="loader" />;
    } else if (loadStatus.status === 'done') {
      content = <Character sheet={sheet} />;
    } else {
      content = [
        <div>Failed to load character.</div>,
        <div>{`Error: ${loadStatus.errorMsg}`}</div>,
      ];
    }
    return content;
  };

  return (
    <div className="Overlay">
      <BeyondLoader
        selectedProfile={selectedProfile}
        onBeyondLoaded={(sheetData) => {
          setSheet(sheetData);
          setLoadStatus({ status: 'done' });
        }}
        onBeyondError={(errorMsg) => setLoadStatus({ status: 'error', errorMsg })}
      />
      <Tabs defaultTab="Select Character" className="OverlayTabs">
        <Tab title="Select Character">
          <CharacterSelection
            profileOperations={profileOperations}
            savedProfiles={savedProfiles}
            selectedProfile={selectedProfile}
          />
        </Tab>
        <Tab title="Character Sheet">
          {sheet ? sheetContent() : <div>Please select a character.</div>}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Overlay;
