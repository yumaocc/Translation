/******/ (() => { // webpackBootstrap
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
let x = 0;
let y = 0;
document.addEventListener("selectionchange", () => {
    const selection = document.getSelection();
    const oRange = selection.getRangeAt(0);
    const oRect = oRange.getBoundingClientRect();
    x = oRect.x;
    y = oRect.y;
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    let div = document.createElement("div");
    console.log(msg.result);
    div.innerHTML = msg.result;
    div.className = "aaaaaa";
    div.style = `position: fixed;top: ${y - 50}px;left: ${x + 50}px;padding: 10px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;background-color: white; border-radius: 5px;`;
    document.querySelector("body").appendChild(div);
    const root = document.createElement("div");
    document.body.appendChild(root);
    setTimeout(() => {
        var thisNode = document.querySelector(".aaaaaa");
        thisNode.parentNode.removeChild(thisNode);
    }, 3000);
});

/******/ })()
;
//# sourceMappingURL=contentScript.js.map