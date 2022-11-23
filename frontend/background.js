chrome.tabs.onUpdated.addListener((tabId, tab) => {
  // Get tab url
  console.log("Chrome tab updated");
  const urlParameters = new URLSearchParams(tab.url);

  // Send url to contentScript
  chrome.tabs.sendMessage(tabId, {
    type: "NEW",
    webpage: urlParameters
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log("Chrome tab running");
      if (request.message == "listeners") {
          
          // TODO (ASH) get out the url
          chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
          });
          // const url_encoed = b64_encode(url)
          // TODO(ASH) Understand the difference between GET and POST
          // If you use GET you need to encode the url as something (usually we use base 64)
          // If you use POST you an insert the url or other data directly in POST fields
          console.log(url)
          fetch('http://127.0.0.1:5000/detect').then(r => r.text()).then(result => {
            console.log()
            console.log(result)
        }) 
      }
  }
);

// // Check to see if current webpage is a YouTube page
// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (tab.url && tab.url.includes("youtube.com/watch")) {
//     const queryParameters = tab.url.split("?")[1];
//     // Interface to work w/ urls
//     const urlParameters = new URLSearchParams(queryParameters);

//     // Isolate id after v= on a YouTube video
//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       videoId: urlParameters.get("v"),
//     });
//   }
// });