// popup.js

function updatePopup() {
  chrome.runtime.sendMessage({ action: "getWebpageActivity" }, (response) => {
    console.log(response.data)
  });
}

updatePopup();

setInterval(updatePopup, 10000); // Update every 10 seconds

