import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileModel from '../../models/profile';
import type from '../../utils/types';

const BEYOND_ID_LENGTH = 8;

function AddCharacterForms(props) {
  const { savedProfiles, onAddProfile, onCancel } = props;
  const [charId, setCharId] = useState('');
  const [error, setError] = useState('');

  const validateInputId = (input) => {
    const parsedId = parseInt(input, 10);
    if (input.length !== BEYOND_ID_LENGTH || !type.isNumber(parsedId)) {
      throw new Error('Invalid DnD Beyond character ID provided');
    }
    if (savedProfiles.find((profile) => profile.id === parsedId)) {
      throw new Error('Character profile already exists.');
    }
    return parsedId;
  };

  const handleAddCharacter = () => {
    let id;
    try {
      id = validateInputId(charId);
    } catch (err) {
      setError(`Error while adding character: ${err.message}`);
      return;
    }

    const url = `https://www.dndbeyond.com/character/${id}/json`;
    onAddProfile(fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const avatar = jsonData.avatarUrl || '';
        const level = jsonData.classes.reduce((total, classObj) => {
          const classLevel = parseInt(classObj.level, 10);
          return total + classLevel;
        }, 0);
        return new Promise((resolve) => resolve(ProfileModel({
          id,
          name: jsonData.name,
          avatar,
          level,
        })));
      }));
  };

  return (
    <div>
      <div className="row">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" onClick={handleAddCharacter}>Add Character</button>
      </div>
      <form className="CharacterSelectionInputForms">
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
      {error ? <div>{error}</div> : null}
    </div>
  );
}

AddCharacterForms.propTypes = {
  savedProfiles: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onAddProfile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

function AddCharacter(props) {
  const { addProfile, savedProfiles } = props;
  const [visible, setVisible] = useState(false);

  const triggerFormsButton = (
    <button type="button" onClick={() => setVisible(true)}>Add Character</button>
  );

  const onAddProfile = (profilePromise) => {
    addProfile(profilePromise);
    setVisible(false);
  };

  const addForms = (
    <AddCharacterForms
      savedProfiles={savedProfiles}
      onAddProfile={onAddProfile}
      onCancel={() => setVisible(false)}
    />
  );

  return visible ? addForms : triggerFormsButton;
}

AddCharacter.propTypes = {
  addProfile: PropTypes.func.isRequired,
};

export default AddCharacter;
