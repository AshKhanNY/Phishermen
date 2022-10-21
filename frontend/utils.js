// Purpose is to identify what message to display if page is or isn't YouTube

// Get info about the current tab
export async function getActiveTabURL() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}