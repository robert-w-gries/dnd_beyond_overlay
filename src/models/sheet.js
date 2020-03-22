import scheme from '../utils/modelUtils';

function Sheet(props) {
  const model = scheme.generateModel('SheetModel', props, {
    actions: scheme.array,
    attributes: scheme.array,
    health: scheme.stringRequired,
    level: scheme.number,
    name: scheme.stringRequired,
    savingThrows: scheme.array,
    skills: scheme.array,
  });

  return Object.freeze(model);
}

export default Sheet;
