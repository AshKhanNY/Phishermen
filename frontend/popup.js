import { getActiveTabURL } from "./utils.js";

// Adds a new entry to popup, indicating if current page is phishing or not
const addNewEntry = (entryElement, entry) => {
    console.log(entry.message)
    entryElement.textContent = entry.message

    // const bookmarkTitleElement = document.createElement("div");
    // const newBookmarkElement = document.createElement("div");

    // bookmarkTitleElement.textContent = entry.message;
    // bookmarkTitleElement.className = "entry-title";

    // newBookmarkElement.className = "entry";

    // newBookmarkElement.appendChild(bookmarkTitleElement);
    // entryElement.appendChild(newBookmarkElement);
};

const viewEntries = (currentEntries = []) => {
    const entryElement = document.getElementById("body");

    if (currentEntries.length > 0) {
        const entry = currentEntries[0];
        addNewEntry(entryElement, entry);
    } else {
        entryElement.textContent = 'Error in processing current webpage.';
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
