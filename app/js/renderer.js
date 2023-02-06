const { ipcRenderer } = require("electron");
const timer = require("./timer");
const data = require("../../data");

let linkSobre = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector(".botao-play");
let tempo = document.querySelector(".tempo");
let curso = document.querySelector(".curso");
let botaoAdicionar = document.querySelector(".botao-adicionar");
let campoAdicionar = document.querySelector(".campo-adicionar");

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
    new Notification("Alura Timer", {
      body: `O Curso ${curso.textContent} foi parado!`,
      icon: `img/stop-button.png`,
    });
  } else {
    timer.iniciar(tempo);
    play = true;
    new Notification("Alura Timer", {
      body: `O Curso ${curso.textContent} foi iniciado!`,
      icon: `img/play-button.png`,
    });
  }

  imgs.reverse();

  botaoPlay.src = imgs[0];
});

ipcRenderer.on("curso-trocado", (_, cursoTemp) => {
  timer.parar(cursoTemp)
  data
    .pegaDados(cursoTemp)
    .then((dados) => {
      tempo.textContent = dados.tempo;
    })
    .catch(() => {
      tempo.textContent = "00:00:00";
    });
  curso.textContent = cursoTemp;
});

botaoAdicionar.addEventListener("click", () => {
  if (campoAdicionar.value === "") {
    return;
  }
  let novoCurso = campoAdicionar.value;
  curso.textContent = novoCurso;
  tempo.textContent = "00:00:00";
  campoAdicionar.value = "";
  ipcRenderer.send("curso-adicionado", novoCurso);
});

ipcRenderer.on("atalho-iniciar-parar", () => {
  let click = new MouseEvent("click");
  botaoPlay.dispatchEvent(click);
});
