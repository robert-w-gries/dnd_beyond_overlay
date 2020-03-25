import React, { useState } from 'react';
import styles from './styles/overlay.module.css';
import CharacterSheet from './sheet/CharacterSheet';
import ProfileSelection from './profile/ProfileSelection';

function Overlay() {
  const [sheet, setSheet] = useState(null);

  return (
    <div className={`globalOverlay ${styles.Overlay}`}>
      <div className={styles.Header}>
        <button>Select Character</button>
        <button>Character Sheet</button>
      </div>
      {sheet ? <CharacterSheet sheet={sheet} /> : <ProfileSelection setSheet={setSheet} />}
    </div>
  );
}

export default Overlay;
