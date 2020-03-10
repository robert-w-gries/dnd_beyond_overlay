const validateStats = (stats) => {
  if (!stats || !Array.isArray(stats)) return false;

  return stats.reduce((result, item) => result && typeof item === 'object' && item.constructor === Object);
};

const Sheet = (props) => {
  if (!props) throw new Error('Sheet(): Object not provided');

  const {
    attributes, health, level, name, savingThrows, skills,
  } = props;

  if (!attributes || !validateStats(attributes)) throw new Error('Sheet(): Attributes invalid');
  if (!health) throw new Error('Sheet(): Health invalid');
  if (!level) throw new Error('Sheet(): Level invalid');
  if (!name) throw new Error('Sheet(): Name invalid');
  if (!savingThrows || !validateStats(savingThrows)) throw new Error('Sheet(): Saving Throws invalid');
  if (!skills || !validateStats(skills)) throw new Error('Sheet(): Skills invalid');

  return {
    attributes, health, level, name, savingThrows, skills,
  };
};

export default Sheet;
