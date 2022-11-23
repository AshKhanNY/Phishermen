(() => {
    // Global variables for current webpage
    let currentWebpage = "";
    let result = ""

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, message, site } = obj;

        if (type === "NEW") {
            currentWebpage = site;
            result = message;
            newWebpageLoaded();
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
            newSpan.style.color = "red";
            var elemDiv = document.createElement('div');
            elemDiv.style.cssText = 'width:100%;height:10%;background-image:linear-gradient(to right top, #9800b9, #655ce5, #0087fc, #00a8ff, #00c5fb);text-align: center;';
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

    // // Loads a new video and populates it w/ a button if it doesn't already have it
    // const newVideoLoaded = async () => {
    //     const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
    //     currentVideoBookmarks = await fetchBookmarks();

    //     if (!bookmarkBtnExists) {
    //         // Load bookmark button
    //         const bookmarkBtn = document.createElement("img");
    //         bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
    //         bookmarkBtn.className = "ytp-button " + "bookmark-btn";
    //         bookmarkBtn.title = "Click to bookmark current timestamp";

    //         // 20:00 mark on CodeAcademy video shows how you can grab elements by class or ID and
    //         // make changes to the HTML via JS
    //         youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
    //         youtubePlayer = document.getElementsByClassName("video-stream")[0];

    //         // Appends bookmark element into row of YouTube controls
    //         youtubeLeftControls.appendChild(bookmarkBtn);
    //         bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    //     }
    // }
    // newVideoLoaded();
})();