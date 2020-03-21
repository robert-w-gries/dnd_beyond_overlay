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

  // Handle empty values (on DnD Beyond they are represented as '--')
  if (model.hit.num === '--') {
    model.hit.num = '';
  }
  if (model.damage === '--') {
    model.damage = '';
  }

  return Object.freeze(model);
};

export default ActionsModel;
