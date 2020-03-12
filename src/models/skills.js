function isObject(item) {
  return typeof item === 'object' || item.constructor === Object;
}

const SkillsModel = (props) => {
  if (!props) throw new Error('SkillsModel(): Object not provided');

  ['name', 'bonus', 'prof', 'attr'].forEach((field) => {
    if (props[field] == null) throw new Error(`SkillsModel(): ${field} not provided`);
  });

  const {
    prof, attr, name, bonus,
  } = props;

  const validateObjectFields = (obj, fields) => {
    if (!isObject(obj)) return false;

    // Object is not valid if any of the fields are null/undefined
    return !fields.some((field) => field == null);
  };

  if (!validateObjectFields(bonus, ['sign', 'num'])) {
    throw new Error('SkillsModel.bonus: Invalid object provided');
  }

  return Object.freeze({
    prof, attr, name, bonus,
  });
};

export default SkillsModel;
