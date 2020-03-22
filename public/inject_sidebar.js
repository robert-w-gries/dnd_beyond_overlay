/* eslint-disable no-param-reassign */
function toggle(iframe) {
  if (iframe.style.width === '0px') {
    iframe.style.width = '300px';
  } else {
    iframe.style.width = '0px';
  }
}

const iframe = document.createElement('iframe');
iframe.style.height = '100%';
iframe.style.width = '0px';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.right = '0px';
iframe.style.zIndex = '9000000000000000000';
iframe.frameBorder = 'none';
iframe.src = chrome.extension.getURL('index.html');

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg === 'toggle') {
    toggle(iframe);
  } else if (msg === 'isAlive') {
    sendResponse({ isAlive: true });
  }
});

document.body.appendChild(iframe);

// Needed because `executeScript()` evaluates the last value as a structured result
// eslint-disable-next-line no-unused-expressions
true;
