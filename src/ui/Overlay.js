import React, { useState } from 'react';
import './Overlay.css';
import BeyondFrame from './BeyondFrame';
import Character from './character/Character';
import { Tabs, Tab } from './utils/Tabs';

function Overlay() {
  const [data, setData] = useState(null);
  return (
    <div className="Overlay">
      <BeyondFrame setData={(newData) => { setData(newData); }} />
      <Tabs defaultTab="Character Sheet" className="OverlayTabs">
        <Tab title="Character Sheet">
          { data ? <Character sheet={data} /> : null }
        </Tab>
        <Tab title="Select A Character">
          <SelectCharacter />
        </Tab>
      </Tabs>
    </div>
  );
}

function SelectCharacter() {
  return (
    <div className="SelectCharacter">Select A Character</div>
  );
}

export default Overlay;
