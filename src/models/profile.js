const Profile = (props) => {
  if (!props) throw new Error('Profile(): Object not provided');

  const {
    avatar, id, level, name,
  } = props;

  if (!id) throw new Error('Profile(): ID invalid');
  if (!level) throw new Error('Profile(): Level invalid');
  if (!name) throw new Error('Profile(): Name invalid');

  const defaultAvatar = 'https://www.dndbeyond.com/Content/Skins/Waterdeep/images/characters/default-avatar-builder.png';
  return {
    avatar: avatar || defaultAvatar,
    id,
    level,
    name,
  };
};

export default Profile;
