const { ipcRenderer, shell } = require("electron");
const process = require('process')

let linkClose = document.querySelector("#link-close");
let linkLinkedin = document.querySelector("#link-linkedin");
let electronVersion = document.querySelector("#electron-version");

window.onload = ()=>{
  electronVersion.textContent = process.versions.electron;
}

linkClose.addEventListener("click", () => {
  ipcRenderer.send("close-window-about");
});

linkLinkedin.addEventListener("click", () => {
  shell.openExternal("https://www.linkedin.com/in/devbrunosajermann/");
});
