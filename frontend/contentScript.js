(() => {
    // Global variables for current webpage
    let currentWebpage = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, webpage } = obj;

        if (type === "NEW") {
            currentWebpage = webpage;
            newWebpageLoaded();
        }
    });

    // var temp_btn = document.createElement('a');
    // temp_btn.id = "temp_btn";
    // temp_btn.appendChild(document.createTextNode("Flask Server Checker"));


    // document.getElementById('temp_btn').onclick = function(){
    //     chrome.runtime.sendMessage({message: "listeners"}, function(response) {
    //     });
    // }

    // Upon loading new webpage, send message to background.js to run Python script
    const newWebpageLoaded = async () => {
        chrome.runtime.sendMessage({message: "listeners"}, function(response) {
        });
    }
    // newWebpageLoaded();

    // // Grab bookmarks from chrome storage if current video has been bookmarked before
    // const fetchBookmarks = () => {
    //     return new Promise((resolve) => {
    //         chrome.storage.sync.get([currentVideo], (obj) => {
    //             resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
    //         });
    //     });
    // };

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

    // // Handles the current timestamp of a video
    // const addNewBookmarkEventHandler = async () => {
    //     const currentTime = youtubePlayer.currentTime;
    //     const newBookmark = {
    //         time: currentTime,
    //         desc: "Bookmark at " + getTime(currentTime),
    //     };

    //     currentVideoBookmarks = await fetchBookmarks();
        
    //     chrome.storage.sync.set({
    //         [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
    //     });
    // }

    // newVideoLoaded();
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 8);
}