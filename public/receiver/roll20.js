const chatNode = document.querySelector('#textchat-input');

const input = {
  text: chatNode.querySelector('textarea'),
  submit: chatNode.querySelector('.btn'),
};

const formatRoll = ({ name, check, damage }) => {
  const strs = [
    '&{template:default}',
    `{{name=${name}}}`,
    `{{roll=[[${check.dice}${check.bonus}]]}}`,
  ];
  if (damage && damage !== '--') {
    strs.push(`{{damage=[[${damage}]]}}`);
  }
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
