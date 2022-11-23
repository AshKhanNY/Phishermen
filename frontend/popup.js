import { getActiveTabURL } from "./utils.js";

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

// const onPlay = async e => {
//     const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
//     const activeTab = await getActiveTabURL();
  
//     chrome.tabs.sendMessage(activeTab.id, {
//       type: "PLAY",
//       value: bookmarkTime,
//     });
//   };
  
// const onDelete = async e => {
// const activeTab = await getActiveTabURL();
// const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
// const bookmarkElementToDelete = document.getElementById(
//     "bookmark-" + bookmarkTime
// );

// bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

// chrome.tabs.sendMessage(activeTab.id, {
//     type: "DELETE",
//     value: bookmarkTime,
// }, viewBookmarks);
// };

// const setBookmarkAttributes =  (src, eventListener, controlParentElement) => {
// const controlElement = document.createElement("img");

// controlElement.src = "assets/" + src + ".png";
// controlElement.title = src;
// controlElement.addEventListener("click", eventListener);
// controlParentElement.appendChild(controlElement);
// };

document.addEventListener("DOMContentLoaded", async () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentWebpage = tabs[0].url;
        chrome.storage.sync.get([currentWebpage], (data) => {
            const currentEntries = data[currentWebpage] ? JSON.parse(data[currentWebpage]) : [];
            viewEntries(currentEntries);
        })
     });
});
