import React from 'react';
import PropTypes from 'prop-types';
import AddCharacter from './AddCharacter';
import CharacterProfile from './CharacterProfile';

const profileOperationsTypes = PropTypes.shape({
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
});

const profileTypes = PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

const savedProfilesTypes = PropTypes.arrayOf(profileTypes);

const defaultProfile = {
  avatar: '',
  id: null,
  level: null,
  name: '',
};

function CharacterSelection(props) {
  const {
    profileOperations, savedProfiles, selectedProfile,
  } = props;

  return (
    <div>
      <AddCharacter addProfile={profileOperations.add} />
      <SavedProfiles
        profileOperations={profileOperations}
        savedProfiles={savedProfiles}
        selectedProfile={selectedProfile}
      />
    </div>
  );
}

CharacterSelection.propTypes = {
  profileOperations: profileOperationsTypes.isRequired,
  savedProfiles: savedProfilesTypes.isRequired,
  selectedProfile: profileTypes,
};
CharacterSelection.defaultProps = {
  selectedProfile: defaultProfile,
};

function SavedProfiles(props) {
  const { profileOperations, savedProfiles, selectedProfile } = props;
  if (!savedProfiles) {
    return null;
  }

  const profiles = savedProfiles.map((profile) => {
    const { id } = profile;
    return (
      <CharacterProfile
        key={id.toString()}
        removeProfile={profileOperations.remove}
        selected={selectedProfile && id === selectedProfile.id}
        profile={profile}
        selectProfile={profileOperations.select}
      />
    );
  });

  return (
    <div className="grid twocol">
      {profiles}
    </div>
  );
}

SavedProfiles.propTypes = {
  profileOperations: profileOperationsTypes.isRequired,
  savedProfiles: savedProfilesTypes.isRequired,
  selectedProfile: profileTypes,
};
SavedProfiles.defaultProps = {
  selectedProfile: defaultProfile,
};

export default CharacterSelection;
