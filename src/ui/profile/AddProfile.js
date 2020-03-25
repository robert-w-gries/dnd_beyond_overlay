import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';
import type from '../../utils/types';

const BEYOND_ID_LENGTH = 8;

function AddProfileForms({ onAddProfile, onCancel, onError }) {
  const [charId, setCharId] = useState('');

  const validateInputId = (input) => {
    const parsedId = parseInt(input, 10);
    if (input.length !== BEYOND_ID_LENGTH || !type.isNumber(parsedId)) {
      throw new Error('Invalid DnD Beyond Character ID.');
    }
    return parsedId;
  };

  const handleAddCharacter = () => {
    let id;
    try {
      id = validateInputId(charId);
    } catch (err) {
      onError(err.message);
      return;
    }

    onAddProfile(id);
  };

  return (
    <div>
      <form className={styles.InputForm}>
        <label htmlFor="idInput">
          Character ID:
          <input
            id="idInput"
            type="text"
            minLength="8"
            maxLength="8"
            size="8"
            value={charId}
            onChange={(event) => setCharId(event.target.value)}
          />
        </label>
      </form>
      <div className={styles.AddButtonsRow}>
        <button
          type="button"
          onClick={onCancel}
          onKeyPress={onCancel}>
          Cancel
        </button>
        <button
          className={styles.AddCharacterButton}
          type="submit"
          onClick={handleAddCharacter}
          onKeyPress={handleAddCharacter}>
          Add Character
        </button>
      </div>
    </div>
  );
}

AddProfileForms.propTypes = {
  onAddProfile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

function AddProfile({ addProfile, clearError, onError }) {
  const [visible, setVisible] = useState(false);

  const triggerFormsButton = (
    <button type="button" onClick={() => { setVisible(true); clearError(); }}>
      Add Character
    </button>
  );

  const onAddProfile = (id) => {
    addProfile(id);
    setVisible(false);
    clearError();
  };

  const addForms = ([
    <p className={styles.Info}>
      Go to your DnD Beyond character sheet page
       and use the last 8 digits of the URL to get your ID.
    </p>,
    <AddProfileForms
    onAddProfile={onAddProfile}
      onCancel={() => {
        setVisible(false);
        clearError();
      }}
      onError={onError}
    />,
  ]);

  return visible ? addForms : triggerFormsButton;
}

AddProfile.propTypes = {
  addProfile: PropTypes.func.isRequired,
};

export default AddProfile;
