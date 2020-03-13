const type = {
  isArray: (value) => value && typeof value === 'object' && value.constructor === Array,
  isBoolean: (value) => typeof value === 'boolean',
  isNumber: (value) => typeof value === 'number' && Number.isFinite(value),
  isObject: (value) => typeof value === 'object' || value.constructor === Object,
  isString: (value) => typeof value === 'string' || value instanceof String,
};

export default type;
