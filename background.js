// let sessionStartTime = Date.now();
// let webpageActivity = {};

const websites_visited = new Map();
var total_repeats = 0 //TODO: CHANGE THIS FOR PRODUCTION
// websites_visited.set('https://sakai.duke.edu/portal/site/a7b5d1b2-e354-45bf-b1ef-b0c51e50c4aa', 2)


chrome.webNavigation.onCommitted.addListener(
    (details) => {
        // want to get the qualifier to see if the search came from the webpage
        if (
            details.transitionQualifiers.includes("from_address_bar") &&
            details.documentLifecycle == 'active'
        ) {
            console.log("this page was loaded from address bar")
            // now, we want to actually cache the URIs that have been saved
            // see if it's already in the websites_visited. If it is, update it
            if (websites_visited.has(details.url)) {
                previous_count = websites_visited.get(details.url)
                websites_visited.set(details.url, previous_count+1)
                // websites_visited
                total_repeats++;
                console.log("already visited this!");
            } else {
                websites_visited.set(details.url, 0);
                console.log("new site visited");
            }
        }
    }
)

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "getWebpageActivity") {
        // need to search the max values
        top_site_key = '';
        top_site_value = 0;
        if (websites_visited.size > 0) {
            for (var [key, value] of websites_visited) {
                if (value > top_site_value) {
                    top_site_key = key;
                    top_site_value = value;
                }
            }
        }

        sendResponse({total: total_repeats, top_site: top_site_key, top_site_usage: top_site_value});
    }
});
