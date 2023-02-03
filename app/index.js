const { ipcRenderer } = require("electron");

let linkAbout = document.querySelector("#link-about");

linkAbout.addEventListener("click", () => {
  ipcRenderer.send('open-window-about')
});
