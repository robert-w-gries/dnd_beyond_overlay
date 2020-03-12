import scheme from '../utils/modelUtils';

const SkillsModel = (props) => {
  const model = scheme.generateModel('SkillsModel', props, {
    prof: scheme.stringRequired,
    attr: scheme.stringRequired,
    name: scheme.stringRequired,
    bonus: {
      sign: scheme.string,
      num: scheme.number,
    },
  });

  return Object.freeze(model);
};

export default SkillsModel;
