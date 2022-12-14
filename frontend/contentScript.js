(() => {
    // Global variables for current webpage
    let currentWebpage = "";
    let result = ""
    let toggle = 0

    // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //     const { checkbox } = message;
    //     if (checkbox) {
    //         document.getElementById('body').style.display = checkbox ? 'none': 'block';
    //     }
    // });

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, message, site } = obj;

        if (type === "NEW") {
            currentWebpage = site;
            result = message;
            if (toggle == 0){
                newWebpageLoaded();
                toggle = 1;
            }
        }
    });

    // Upon loading new webpage, update extension to display if
    // current webpage is a phishing site or not.
    const newWebpageLoaded = async () => {
        const newEntry = {
            site: currentWebpage,
            message: result,
        };
        currentEntries = await fetchEntries();
        chrome.storage.sync.set({
            [currentWebpage]: JSON.stringify([...currentEntries, newEntry].sort((a, b) => a.time - b.time))
        });

        if (result.includes("NOT")){
            // Create "banner" to display on very top of webpage
            var newSpan = document.createElement("newSpan");
            newSpan.id = "newSpan";
            newSpan.style.fontSize = "18px";
            newSpan.style.fontWeight = "bold";
            newSpan.textContent = "*Warning: This site can potentially be harmful*"
            newSpan.style.color = "white";
            var elemDiv = document.createElement('div');
            elemDiv.style.cssText = 'width:100%;height:20%;background-color: coral; text-align: center;';
            elemDiv.appendChild(newSpan);
            window.document.body.insertBefore(elemDiv, window.document.body.firstChild);
        }
    }
    // newWebpageLoaded();

    // Grab webpages from chrome storage if current page has been checked before
    const fetchEntries = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentWebpage], (obj) => {
                resolve(obj[currentWebpage] ? JSON.parse(obj[currentWebpage]) : []);
            });
        });
    };
})();