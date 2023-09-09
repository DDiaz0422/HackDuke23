// popup.js

function updatePopup() {
  chrome.runtime.sendMessage({ action: "getWebpageActivity" }, (response) => {
    const sessionDuration = chrome.action.getBadgeText();
    const webpageActivity = response.data;
    
    document.getElementById("sessionDuration").textContent = sessionDuration;
    
    const webpageList = document.getElementById("webpageList");
    webpageList.innerHTML = "";
    
    for (const url in webpageActivity) {
      const listItem = document.createElement("li");
      listItem.textContent = `${url}: ${webpageActivity[url].count} times`;
      webpageList.appendChild(listItem);
    }
  });
}

updatePopup();

setInterval(updatePopup, 10000); // Update every 10 seconds
