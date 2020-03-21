const chatNode = document.querySelector('#textchat-input');

const input = {
  text: chatNode.querySelector('textarea'),
  submit: chatNode.querySelector('.btn'),
};

const formatRoll = ({ characterName, type, ...props }) => {
  const strs = [
    '&{template:default}',
    `{{name=${characterName}}}`,
    `{{${type}=}}`,
  ];
  Object.keys(props).forEach((key) => strs.push(`{{${key}=${props[key]}}}`));
  console.log(strs);
  return strs.join(' ');
};

const sendRoll = (roll) => {
  console.log("test");
  const savedText = input.text.value;
  input.text.value = formatRoll(roll);
  input.submit.click();
  input.text.value = savedText;
};

const backgroundPort = chrome.runtime.connect({ name: 'roll20' });
backgroundPort.onMessage.addListener((msg) => sendRoll(msg));
