import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/profile.module.css';
import ProfileModel from '../../models/profile';
import type from '../../utils/types';

const BEYOND_ID_LENGTH = 8;

function AddProfileForms(props) {
  const { onAddProfile, onCancel, onError } = props;
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

    const url = `https://www.dndbeyond.com/character/${id}/json`;

    try {
      onAddProfile(id, fetch(url)
        .then((response) => response.json())
        .catch(() => Promise.reject(new Error('Profile not found.')))
        .then((jsonData) => {
          if (jsonData.errorCode === 404) {
            const strs = [
              'Could not retrieve profile.',
              'Please verify your character privacy is set to public.',
            ];
            throw new Error(strs.join('\n'));
          }
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
        onError('Character already added.');
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
    </div>
  );
}

AddProfileForms.propTypes = {
  onAddProfile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

function AddProfile(props) {
  const { addProfile, clearError, onError } = props;
  const [visible, setVisible] = useState(false);

  const triggerFormsButton = (
    <button type="button" onClick={() => { setVisible(true); clearError(); }}>
      Add Character
    </button>
  );

  const onAddProfile = (id, profilePromise) => {
    addProfile(id, profilePromise);
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
