function extensionIsListening(response) {
  return !chrome.runtime.lastError && response && response.isAlive;
}

// We want to send the toggle message to the sidebar script
// If the sidebar script is not yet setup, we call executeScript to initialize it
function ensureSendMessage(tabId, message, callback) {
  // Check if tab is ready for sidebar injection
  chrome.tabs.sendMessage(tabId, 'isAlive', (response) => {
    if (extensionIsListening(response)) {
      // the listener is setup so we can send the toggle message now
      chrome.tabs.sendMessage(tabId, message, callback);
      return;
    }

    // No listener on the other end; manually attempt to execute the sidebar injection
    chrome.tabs.executeScript(tabId, { file: 'inject_sidebar.js' }, () => {
      if (chrome.runtime.lastError) {
        throw Error(`Unable to inject sidebar into tab ${tabId}`);
      }
      chrome.tabs.sendMessage(tabId, message, callback);
    });

    chrome.tabs.executeScript(tabId, { file: 'roll20.js' });
  });
}

// When the extension icon is clicked, inject the sidebar onto the page
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    ensureSendMessage(tabs[0].id, 'toggle');
  });
});

// Track the receivers where rolls will be sent
// For now, we support only Roll20 but that could change
const receivers = {};

chrome.runtime.onConnect.addListener((port) => {
  receivers[port.name] = port;
});

chrome.runtime.onMessage.addListener((msg) => {
  Object.values(receivers).forEach((port) => {
    port.postMessage(msg);
  });
});
