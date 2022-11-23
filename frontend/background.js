chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.log("Chrome tab running");
  // TODO (ASH) get out the url
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var weburl = tabs[0].url;
      console.log(weburl);
      // encodedURL = btoa(weburl);
      host = 'http://127.0.0.1:5000/detect/'

      // Send data to Flask server via fetch POST call
      fetch(host, {
          // Adding method type
          method: "POST",
          // Data to send
          body: JSON.stringify({
            "url" : weburl
          }),
          // Adding headers to the request
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
      .then(response => response.json())  
      .then(json => {
          console.log(json)
          // Parse JSON retrieved from server
          data = json
          // Send url to contentScript
          chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            message: data["message"],
            site: data["site"]
          });
      })
      // console.log("Sent a POST to flask.")
  });
});