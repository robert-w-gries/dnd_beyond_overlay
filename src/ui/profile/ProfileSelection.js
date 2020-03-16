import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddProfile from './AddProfile';
import BeyondLoader from './BeyondLoader';
import CharacterProfile from './CharacterProfile';
import ProfileModel from '../../models/profile';

function ProfileSelection(props) {
  const { onCharacterReady } = props;
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    // TODO: Load saved user profiles
    setSavedProfiles([
      ProfileModel({
        avatar: '',
        id: 20359926,
        name: 'Jives Thickbottome',
        level: 17,
      }),
      ProfileModel({
        avatar: '',
        id: 20976116,
        name: 'Erwin Mossfoot',
        level: 16,
      }),
      ProfileModel({
        avatar: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/8965/197/240/150/637186813156282102.jpeg',
        id: 21275516,
        name: 'Lilia',
        level: 17,
      }),
    ]);
  }, []);

  const profileOperations = {
    add: (profilePromise) => {
      profilePromise.then((profile) => {
        setSavedProfiles((list) => [...list, profile]);
      });
    },
    remove: (profile) => {
      if (profile === currentProfile) {
        setCurrentProfile(null);
      }
      setSavedProfiles((list) => list.filter((p) => profile.id !== p.id));
    },
    select: (profile) => {
      if (currentProfile && profile.id === currentProfile.id) {
        return;
      }
      setCurrentProfile(profile);
    },
  };

  const onCharacterLoaded = (loadingPromise) => {
    onCharacterReady(loadingPromise.then((result) => {
      if (!result.success) {
        return Promise.reject(result.errorMsg);
      }
      return result.data;
    }));
  };

  return (
    <div>
      <BeyondLoader
        currentProfile={currentProfile}
        onBeyondLoaded={onCharacterLoaded}
      />
      <AddProfile addProfile={profileOperations.add} savedProfiles={savedProfiles} />
      <SavedProfiles
        profileOperations={profileOperations}
        savedProfiles={savedProfiles}
        currentProfile={currentProfile}
      />
    </div>
  );
}

ProfileSelection.propTypes = {
  onCharacterReady: PropTypes.func.isRequired,
};

function SavedProfiles(props) {
  const { profileOperations, savedProfiles, currentProfile } = props;
  if (!savedProfiles) {
    return null;
  }

  const profiles = savedProfiles.map((profile) => {
    const { id } = profile;
    return (
      <CharacterProfile
        key={id.toString()}
        removeProfile={profileOperations.remove}
        selected={currentProfile && id === currentProfile.id}
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

const profileType = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

SavedProfiles.propTypes = {
  profileOperations: PropTypes.shape({
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  }).isRequired,
  savedProfiles: PropTypes.arrayOf(PropTypes.shape(profileType)).isRequired,
  currentProfile: profileType,
};

SavedProfiles.defaultProps = {
  currentProfile: {
    avatar: '',
    id: null,
    level: null,
    name: '',
  },
};

export default ProfileSelection;
