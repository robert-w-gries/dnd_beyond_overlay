import scheme from '../utils/modelUtils';

const ActionsModel = (props) => {
  const model = scheme.generateModel('ActionsModel', props, {
    name: scheme.stringRequired,
    range: {
      range: scheme.stringRequired,
      reach: scheme.bool,
      long: scheme.string,
    },
    hit: {
      sign: scheme.string,
      num: scheme.stringRequired,
    },
    damage: scheme.stringRequired,
  });

  return Object.freeze(model);
};

export default ActionsModel;
