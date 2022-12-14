import { getActiveTabURL } from "./utils.js";

// const checkbox = document.querySelector("input[name=checkbox]");
// checkbox.addEventListener('change', (event) => {
//     const { checked } = event.target;
//     toggleContent(checked);
// });

// const toggleContent = (checked) => {
//     chrome.runtime.sendMessage({"checkbox": checked}, (response) => {
//         console.log(`Checkbox is turned ${checked ? 'on' : 'off'}`)
//     });
// };

// Adds a new entry to popup, indicating if current page is phishing or not
const addNewEntry = async (entryElement, entry) => {
    // console.log(entry.message)
    // console.log(activeTab.url);
    const message = entry.message;
    const activeTab = await getActiveTabURL();
    const url = activeTab.url;
    
    const body = document.createElement("div");
    body.className = "body";
    body.textContent = message;

    const subbody = document.createElement("div");
    subbody.className = "subbody";
    subbody.innerHTML = "Website: " + url + "<br/>";

    const icon = document.createElement("div");
    const iconImage = document.createElement("img");
    var src = message.includes("NOT") ? 'unsafe' : 'safe';
    iconImage.src = "assets/" + src + ".png";
    iconImage.style = "width: 200px; padding: 20px 0 0 40px; text-align: center;";
    icon.title = src;
    icon.appendChild(iconImage);

    entryElement.appendChild(body);
    entryElement.appendChild(subbody);
    entryElement.appendChild(icon);
};

const viewEntries = (currentEntries = []) => {
    const entryElement = document.getElementsByClassName("main_body")[0];
    entryElement.innerHTML = "";

    if (currentEntries.length > 0) {
        const entry = currentEntries[0]; // will take in the most recent entry
        addNewEntry(entryElement, entry);
    } else {
        entryElement.innerHTML = "<div class='subbody'>Error in processing current webpage.</div>"
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentWebpage = tabs[0].url;
        chrome.storage.sync.get([currentWebpage], (data) => {
            const currentEntries = data[currentWebpage] ? JSON.parse(data[currentWebpage]) : [];
            viewEntries(currentEntries);
        })
     });
});
