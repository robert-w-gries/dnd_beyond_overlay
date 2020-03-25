import scheme from '../utils/modelUtils';

const StatsModel = (props) => {
  const model = scheme.generateModel('StatsModel', props, {
    name: scheme.stringRequired,
    total: scheme.number,
    bonus: {
      sign: scheme.string,
      num: scheme.number,
    },
  });

  return Object.freeze(model);
};

export default StatsModel;
