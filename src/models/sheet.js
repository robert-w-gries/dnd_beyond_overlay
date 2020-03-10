const validateList = (list) => {
  if (!list || !Array.isArray(list)) return false;

  for (let index = 0; index < list.length; index += 1) {
    const item = list[index];
    if (typeof item !== 'object' || item.constructor !== Object) {
      return false;
    }
  }

  return true;
};

const Sheet = (props) => {
  if (!props) throw new Error('Sheet(): Object not provided');

  const {
    actions, attributes, health, level, name, savingThrows, skills,
  } = props;

  // TODO: Investigate whether validateList actually does anything
  if (!actions || !validateList(actions)) throw new Error('Sheet(): Actions invalid');
  if (!attributes || !validateList(attributes)) throw new Error('Sheet(): Attributes invalid');
  if (!health) throw new Error('Sheet(): Health invalid');
  if (!level) throw new Error('Sheet(): Level invalid');
  if (!name) throw new Error('Sheet(): Name invalid');
  if (!savingThrows || !validateList(savingThrows)) throw new Error('Sheet(): Saving Throws invalid');
  if (!skills || !validateList(skills)) throw new Error('Sheet(): Skills invalid');

  return {
    actions, attributes, health, level, name, savingThrows, skills,
  };
};

export default Sheet;
