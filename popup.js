// popup.js

const total_to_wattage = 0.012; // in kWh
const national_wattage = 0.23; // cost in dollars per kWh

function updatePopup() {
    chrome.runtime.sendMessage({action: "getWebpageActivity"}, (response) => {
        total_repeats = response.total;
        document.getElementById('text_total').innerHTML = `Links Re-opened: ${total_repeats}`
        document.getElementById('text_energy_wasted').innerHTML = `Approximate Energy Wasted: ${(total_repeats * total_to_wattage).toFixed(2)} kwH`
        cost = total_repeats * total_to_wattage * national_wattage
        document.getElementById('cost_energy_wasted').innerHTML = `Approximate Cost: $${cost.toFixed(2)}`
        console.log(response.total)

        //${response.top_site_usage*total_to_wattage*national_wattage}
        document.getElementById("top_site").innerText = `Most Visited Site: $${(response.top_site_usage*total_to_wattage*national_wattage).toFixed(2)}`
        document.getElementById("top_site").href = response.top_site

        console.log(`top: ${response.top_site}, top usage: ${response.top_site_usage}`)
    });
}

updatePopup();

setInterval(updatePopup, 10000); // Update every 10 seconds

