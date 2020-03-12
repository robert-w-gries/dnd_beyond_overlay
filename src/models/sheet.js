function Sheet(props) {
  if (!props) throw new Error('Sheet(): Object not provided');

  ['actions', 'attributes', 'health', 'level', 'name', 'savingThrows', 'skills'].forEach((field) => {
    if (props[field] == null) throw new Error(`Sheet(): ${field} not provided`);
  });

  return Object.freeze({
    actions: props.actions,
    attributes: props.attributes,
    health: props.health,
    level: props.level,
    name: props.name,
    savingThrows: props.savingThrows,
    skills: props.skills,
  });
}

export default Sheet;
