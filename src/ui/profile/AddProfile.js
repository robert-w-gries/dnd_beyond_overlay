import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';
import ProfileModel from '../../models/profile';
import type from '../../utils/types';

const BEYOND_ID_LENGTH = 8;

function AddProfileForms(props) {
  const { onAddProfile, onCancel } = props;
  const [charId, setCharId] = useState('');
  const [error, setError] = useState('');

  const validateInputId = (input) => {
    const parsedId = parseInt(input, 10);
    if (input.length !== BEYOND_ID_LENGTH || !type.isNumber(parsedId)) {
      throw new Error('Invalid DnD Beyond character ID provided');
    }
    return parsedId;
  };

  const handleAddCharacter = () => {
    let id;
    try {
      id = validateInputId(charId);
    } catch (err) {
      setError(`Error: ${err.message}`);
      return;
    }

    const url = `https://www.dndbeyond.com/character/${id}/json`;

    try {
      onAddProfile(id, fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
          const avatar = jsonData.avatarUrl || '';
          const level = jsonData.classes.reduce((total, classObj) => {
            const classLevel = parseInt(classObj.level, 10);
            return total + classLevel;
          }, 0);
          return ProfileModel({
            id,
            name: jsonData.name,
            avatar,
            level,
          });
        }));
    } catch (err) {
      if (err.message === 'ALREADY_EXISTS') {
        setError('Error: Character already added!');
      } else {
        throw err;
      }
    }
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
          onKeyPress={onCancel}
        >
          Cancel
        </button>
        <button
          className={styles.AddCharacterButton}
          type="submit"
          onClick={handleAddCharacter}
          onKeyPress={handleAddCharacter}
        >
          Add Character
        </button>
      </div>
      {error ? <div>{error}</div> : null}
    </div>
  );
}

AddProfileForms.propTypes = {
  onAddProfile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

function AddProfile(props) {
  const { addProfile } = props;
  const [visible, setVisible] = useState(false);

  const triggerFormsButton = (
    <button type="button" onClick={() => setVisible(true)}>Add Character</button>
  );

  const onAddProfile = (id, profilePromise) => {
    addProfile(id, profilePromise);
    setVisible(false);
  };

  const addForms = (
    <AddProfileForms
      onAddProfile={onAddProfile}
      onCancel={() => setVisible(false)}
    />
  );

  return visible ? addForms : triggerFormsButton;
}

AddProfile.propTypes = {
  addProfile: PropTypes.func.isRequired,
};

export default AddProfile;
