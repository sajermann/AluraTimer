const { ipcRenderer } = require("electron");
const timer = require("./timer");
const data = require("../../data");

let linkSobre = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector(".botao-play");
let tempo = document.querySelector(".tempo");
let curso = document.querySelector(".curso");

window.onload = () => {
  data
    .pegaDados(curso.textContent)
    .then((dados) => {
      tempo.textContent = dados.tempo;
    })
    .catch((err) => console.error(err));
};

linkSobre.addEventListener("click", function () {
  ipcRenderer.send("abrir-janela-sobre");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false;

botaoPlay.addEventListener("click", function () {
  if (play) {
    timer.parar(curso.textContent);
    play = false;
  } else {
    timer.iniciar(tempo);
    play = true;
  }

  imgs.reverse();

  botaoPlay.src = imgs[0];
});
