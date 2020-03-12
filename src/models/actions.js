function isObject(item) {
  return typeof item === 'object' || item.constructor === Object;
}

const ActionsModel = (props) => {
  if (!props) throw new Error('ActionsModel(): Object not provided');

  ['name', 'range', 'hit', 'damage'].forEach((field) => {
    if (props[field] == null) throw new Error(`ActionsModel(): ${field} not provided`);
  });

  const {
    name, range, hit, damage,
  } = props;

  const validateObjectFields = (obj, fields) => {
    if (!isObject(obj)) return false;

    // Object is not valid if any of the fields are null/undefined
    return !fields.some((field) => field == null);
  };

  const objectFields = {
    range: ['range', 'long', 'reach'],
    hit: ['sign', 'num'],
  };

  Object.keys(objectFields).forEach((key) => {
    if (!validateObjectFields(props[key], objectFields[key])) throw new Error(`ActionsModel.${key}: Invalid object provided`);
  });

  return Object.freeze({
    name, range, hit, damage,
  });
};

export default ActionsModel;
