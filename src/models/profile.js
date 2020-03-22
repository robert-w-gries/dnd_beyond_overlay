import scheme from '../utils/modelUtils';

const version = 1;

const ProfileModel = (props) => {
  const model = scheme.generateModel('ProfileModel', props, {
    avatar: scheme.string,
    id: scheme.number,
    level: scheme.number,
    name: scheme.stringRequired,
  });

  const defaultAvatar = 'https://www.dndbeyond.com/Content/Skins/Waterdeep/images/characters/default-avatar-builder.png';
  model.avatar = model.avatar || defaultAvatar;

  model.version = version;
  return Object.freeze(model);
};

export default ProfileModel;
