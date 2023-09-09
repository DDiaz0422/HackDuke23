let sessionStartTime = Date.now();
let webpageActivity = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) = {
  if (changeInfo.status === complete) {
    const url = tab.url;
    
     Track webpage activity
    if (webpageActivity[url]) {
      webpageActivity[url].count++;
    } else {
      webpageActivity[url] = { count 1 };
    }
    
     Calculate session duration
    const sessionDuration = Math.floor((Date.now() - sessionStartTime)  1000);

     Update session duration and webpage activity in popup
    chrome.action.setBadgeText({ text sessionDuration.toString() });
    chrome.action.setBadgeBackgroundColor({ color [255, 0, 0, 255] });

     Send webpage activity data to popup
    chrome.runtime.sendMessage({ action updateWebpageActivity, data webpageActivity });
  }
});

 Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) = {
  if (request.action === getWebpageActivity) {
    sendResponse({ data webpageActivity });
  }
});
