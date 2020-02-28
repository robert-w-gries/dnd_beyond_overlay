chrome.storage.local.set({ lifeCycle: 'start' });

chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.executeScript(tabs[0].id, {file: 'inject.js'});
    })
});