// Check to see if current webpage is a YouTube page
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    // Interface to work w/ urls
    const urlParameters = new URLSearchParams(queryParameters);

    // Isolate id after v= on a YouTube video
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});