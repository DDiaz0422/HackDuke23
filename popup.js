// popup.js

const total_to_wattage = 0.012; // in kWh
const national_wattage = 0.23; // cost in dollars per kWh

function updatePopup() {
  chrome.runtime.sendMessage({ action: "getWebpageActivity" }, (response) => {
    total_repeats = response.total;
    document.getElementById('text_total').innerHTML = `Tabs Re-opened: ${total_repeats}`
    document.getElementById('text_energy_wasted').innerHTML = `Approximate Energy Wasted ${total_repeats*total_to_wattage} kwH`
    document.getElementById('text_energy_wasted').innerHTML = `Approximate Cost $${total_repeats*total_to_wattage/national_wattage}`
    console.log(response.total)
  });
}

updatePopup();

setInterval(updatePopup, 10000); // Update every 10 seconds

