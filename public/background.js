// Handle Chrome being unable to load content script on pre-loaded web page
// StackOverflow: https://stackoverflow.com/a/23895822
function ensureSendMessage(tabId, message, callback) {
  // Check if tab is ready for sidebar injection
  chrome.tabs.sendMessage(tabId, 'isAlive', (response) => {
    if (response && response.isAlive) {
      chrome.tabs.sendMessage(tabId, message, callback);
    } else {
      // No listener on the other end; manually attempt to execute the sidebar injection
      chrome.tabs.executeScript(tabId, { file: 'inject_sidebar.js' }, () => {
        if (chrome.runtime.lastError) {
          throw Error(`Unable to inject sidebar into tab ${tabId}`);
        }
        chrome.tabs.sendMessage(tabId, message, callback);
      });
    }
  });
}

// When the extension icon is clicked, inject the sidebar onto the page
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    ensureSendMessage(tabs[0].id, 'toggle');
  });
});
