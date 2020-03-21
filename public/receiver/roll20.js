const chatNode = document.querySelector('#textchat-input');

const input = {
  text: chatNode.querySelector('textarea'),
  submit: chatNode.querySelector('.btn'),
};

const formatRoll = ({ characterName, title, ...props }) => {
  const strs = [
    '&{template:default}',
    `{{name=${characterName}}}`,
    `{{${title}=}}`,
  ];

  // Roll = { roll: str }
  // Label = { label: str }
  Object.keys(props).forEach((key) => {
    const val = props[key].roll ? `[[${props[key].roll}]]` : props[key].label;
    strs.push(`{{${key}=${val}}}`);
  });
  return strs.join(' ');
};

const sendRoll = (roll) => {
  const savedText = input.text.value;
  input.text.value = formatRoll(roll);
  input.submit.click();
  input.text.value = savedText;
};

const backgroundPort = chrome.runtime.connect({ name: 'roll20' });
backgroundPort.onMessage.addListener((msg) => sendRoll(msg));
