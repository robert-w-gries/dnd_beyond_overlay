import React, { useState, useEffect } from 'react';
import './Overlay.css';
import BeyondFrame from './BeyondFrame';
import Character from './character/Character';
import CharacterSelection from './CharacterSelection';
import { Tabs, Tab } from './utils/Tabs';

function Overlay() {
  const [charId, setCharId] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [savedProfiles, setSavedProfiles] = useState(null);
  useEffect(() => {
    // Load saved user profiles
    setSavedProfiles([
      {
        id: 20359926,
        name: 'Jives Thickbottome',
        level: '17',
      },
      {
        id: 20976116,
        name: 'Erwin Mossfoot',
        level: '16',
      },
    ]);
  }, []);

  const selectCharacter = (id) => {
    setIsLoading(true);
    setCharId(id);
  };

  const defaultTab = charId ? 'Character Sheet' : 'Select Character';
  return (
    <div className="Overlay">
      <BeyondFrame charId={charId} setData={setSheet} setIsLoading={setIsLoading} />
      <Tabs defaultTab={defaultTab} className="OverlayTabs">
        <Tab title="Select Character">
          <CharacterSelection savedProfiles={savedProfiles} selectCharacter={selectCharacter} />
        </Tab>
        <Tab title="Character Sheet">
          { isLoading ? <Loading /> : <Character sheet={sheet} /> }
        </Tab>
      </Tabs>
    </div>
  );
}

function Loading() {
  return (<div className="loader" />);
}

export default Overlay;
