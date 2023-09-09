// popup.js

const total_to_wattage = 0.012; // in kWh

function updateTotalRam() {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, {action: "get_ram"}, callback = res => {
        console.log(res.response);
      })
    })
  })
}

function updatePopup() {
  chrome.runtime.sendMessage({ action: "getWebpageActivity" }, (response) => {
    total_repeats = response.total;
    document.getElementById('text_total').innerHTML = `Tabs Re-opened: ${total_repeats}`
    document.getElementById('text_energy_wasted').innerHTML = `Approximate Energy Wasted ${total_repeats*total_to_wattage} kwH`
    console.log(response.total)
  });
}

updatePopup();

setInterval(updatePopup, 10000); // Update every 10 seconds

