import scheme from '../utils/modelUtils';
import types from '../utils/types';

function toRoll(str) {
  return { roll: str };
}

function toLabel(str) {
  return { label: str };
}

const RollModel = (characterName, title, callback) => {
  const model = scheme.generateModel('RollModel', { characterName, title }, {
    characterName: scheme.stringRequired,
    title: scheme.stringRequired,
  });

  const props = types.isFunction(callback) ? callback(toRoll, toLabel) : {};
  if (!types.isObject(props)) {
    throw new Error('RollModel: callback must return object');
  }
  return Object.freeze({ ...model, ...props });
};

export default RollModel;
