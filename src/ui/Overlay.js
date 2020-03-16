import React, { useState } from 'react';
import styles from './styles/Overlay.module.css';
import CharacterSheet from './sheet/CharacterSheet';
import ProfileSelection from './profile/ProfileSelection';
import NestedTab from './tabs/NestedTab';

function Overlay() {
  const [activeTab, setActiveTab] = useState('Select Character');
  const [sheet, setSheet] = useState(null);

  const onCharacterReady = (characterSheetPromise) => {
    characterSheetPromise.then((sheetData) => {
      setActiveTab('Character Sheet');
      setSheet(sheetData);
    });
  };

  return (
    <div className={`globalOverlay ${styles.Overlay}`}>
      <NestedTab title="Select Character" onClick={() => setActiveTab('Select Character')} active>
        <ProfileSelection onCharacterReady={onCharacterReady} />
        <NestedTab title="Character Sheet" active={activeTab === 'Character Sheet'}>
          <CharacterSheet sheet={sheet} />
        </NestedTab>
      </NestedTab>
    </div>
  );
}

export default Overlay;
