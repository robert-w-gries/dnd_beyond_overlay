import type from './types';

function validateObject(objStr, propsObj, schemeObj) {
  if (!schemeObj) {
    throw new Error(`${objStr}: Scheme object null`);
  }

  if (!propsObj) {
    throw new Error(`${objStr}: Properties object null`);
  }

  if (!type.isObject(propsObj)) {
    throw new Error(`${objStr}: Expected this field to be an object`);
  }

  Object.keys(schemeObj).forEach((key) => {
    if (propsObj[key] == null) {
      throw new Error(`${objStr}: ${key} field null`);
    }
  });

  const result = {};
  Object.keys(schemeObj).forEach((key) => {
    if (type.isObject(schemeObj[key])) {
      result[key] = validateObject(`${objStr}.${key}`, propsObj[key], schemeObj[key]);
    } else {
      try {
        result[key] = schemeObj[key](propsObj[key]);
      } catch (err) {
        throw new Error(`${objStr}.${key}: ${err.message}`);
      }
    }
  });
  return result;
}

function validateValue(checkType, checkValue) {
  return (value) => {
    if (value == null) {
      throw new Error('Value was null or undefined');
    }

    if (!checkType(value)) {
      throw new Error(`Value \`${value}\` was not expected type`);
    }

    if (checkValue && !checkValue(value)) {
      throw new Error('Value was required and found empty');
    }

    return value;
  };
}

const scheme = {
  generateModel: validateObject,
  array: validateValue(type.isArray),
  bool: validateValue(type.isBoolean),
  number: validateValue(type.isNumber),
  string: validateValue(type.isString),
  stringRequired: validateValue(type.isString, (str) => str !== ''),
};

export default scheme;
