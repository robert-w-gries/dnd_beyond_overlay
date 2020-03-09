import React, { useState } from 'react';
import './Overlay.css';
import BeyondFrame from './BeyondFrame';
import Character from './character/Character';
import CharacterSelection from './CharacterSelection';
import { Tabs, Tab } from './utils/Tabs';

function Overlay() {
  const [charId, setCharId] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultTab = charId ? 'Character Sheet' : 'Select A Character';
  return (
    <div className="Overlay">
      <BeyondFrame charId={charId} setData={setData} setIsLoading={setIsLoading} />
      <Tabs defaultTab={defaultTab} className="OverlayTabs">
        <Tab title="Select A Character">
          <CharacterSelection setCharId={setCharId} setIsLoading={setIsLoading} />
        </Tab>
        <Tab title="Character Sheet">
          { isLoading ? <Loading /> : <Character sheet={data} /> }
        </Tab>
      </Tabs>
    </div>
  );
}

function Loading() {
  return (<div className="loader" />);
}

export default Overlay;
