import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileModel from '../../models/profile';

function AddCharacterForms(props) {
  const { onAddProfile, onCancel } = props;

  const [charName, setCharName] = useState('');
  const [charId, setCharId] = useState('');

  const handleAddCharacter = () => {
    const url = `https://www.dndbeyond.com/character/${charId}/json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const avatar = data.avatarUrl || '';
        const level = data.classes.reduce((total, classObj) => {
          const classLevel = parseInt(classObj.level, 10);
          return total + classLevel;
        }, 0);
        const profile = ProfileModel({
          id: parseInt(charId, 10),
          name: data.name,
          avatar,
          level,
        });
        onAddProfile(profile);
      });
  };

  return (
    <div>
      <div className="row">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" onClick={handleAddCharacter}>Add Character</button>
      </div>
      <form className="CharacterSelectionInputForms">
        <label htmlFor="nameInput">
          Profile Name:
          <input
            id="nameInput"
            type="text"
            minLength="1"
            maxLength="25"
            value={charName}
            onChange={(event) => setCharName(event.target.value)}
          />
        </label>
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
    </div>
  );
}

AddCharacterForms.propTypes = {
  onAddProfile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

function AddCharacter(props) {
  const { addProfile } = props;
  const [visible, setVisible] = useState(false);

  const triggerFormsButton = (
    <button type="button" onClick={() => setVisible(true)}>Add Character</button>
  );

  const onAddProfile = (profile) => {
    addProfile(profile);
    setVisible(false);
  };

  const addForms = (
    <AddCharacterForms onAddProfile={onAddProfile} onCancel={() => setVisible(false)} />
  );

  return visible ? addForms : triggerFormsButton;
}

AddCharacter.propTypes = {
  addProfile: PropTypes.func.isRequired,
};

export default AddCharacter;
