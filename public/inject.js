chrome.storage.local.get(['lifeCycle'], function(result) {
    if (result.lifeCycle === 'running') {
        let iframe = document.getElementById("sidebar");
        document.body.removeChild(iframe);
        chrome.storage.local.set({ lifeCycle: 'hidden' });
        return;
    }

    // We want to make the sidebar appear if in 'start' or 'hidden' lifecycle
    chrome.storage.local.set({ lifeCycle: 'running' });

    let iframe = document.createElement('iframe'); 
    iframe.setAttribute("id", "sidebar");
    iframe.style.background = "green";
    iframe.style.height = "100%";
    iframe.style.width = "400px";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.right = "0px";
    iframe.style.zIndex = "9000000000000000000";
    iframe.frameBorder = "none"; 
    iframe.src = chrome.extension.getURL("index.html");

    document.body.appendChild(iframe);
});