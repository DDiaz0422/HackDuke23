// let sessionStartTime = Date.now();
// let webpageActivity = {};

const websites_visited = new Set();
var total_repeats = 0


chrome.webNavigation.onCommitted.addListener(
    (details) => {
      // want to get the qualifier to see if the search came from the webpage
      if (
          details.transitionQualifiers.includes("from_address_bar") &&
          details.documentLifecycle == 'active'
      ) {
        console.log("this page was loaded from addy bar")
        // now, we want to actually cache the URIs that have been saved
        // see if it's already in the websites_visited. If it is, update it
        if (websites_visited.has(details.url)) {
          total_repeats++;
          console.log("already visited this!");
        }
        else {
          websites_visited.add(details.url);
          console.log("new site visited")
        }
      }
    }
)

 // Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "getWebpageActivity") {
    sendResponse({ data: 'yerrr' });
  }
});
