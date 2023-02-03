const {ipcRenderer} = require('electron')

const moment = require("moment");
let segundos = 0;

let timer;
let tempo;

module.exports = {
  iniciar(el) {
    tempo = moment.duration(el.textContent);
    segundos = tempo.asSeconds();
    clearInterval(timer);
    timer = setInterval(() => {
      segundos++;
      el.textContent = this.segundosParaTempo(segundos);
    }, 1000);
  },
  segundosParaTempo(segundos) {
    return moment().startOf("day").seconds(segundos).format("HH:mm:ss");
  },
  parar(curso) {
    clearInterval(timer);
    ipcRenderer.send('curso-parado', curso, this.segundosParaTempo(segundos))
  },
};
