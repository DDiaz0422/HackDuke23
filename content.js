chrome.runtime.onMessage((message, sender, sendResponse) => {
    if (message.action == "get_ram") {
        sendResponse({response: window.performance.memory.totalJSHeapSize})
    }
})