const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const data = require("./data");
module.exports = {
  templateInicial: null,
  geraTrayTemplate(win) {
    const cursos = data.pegaNomeDosCursos();
    const template = cursos.map((item) => ({
      label: item,
      type: "radio",
      click: () => {
        win.send("curso-trocado", item);
      },
    }));
    this.templateInicial = template;
    return template;
  },
  adicionaCursoNoTray(curso, win) {
    this.templateInicial.push({
      label: curso,
      type: "radio",
      checked: true,
      click: () => {
        win.send("curso-trocado", curso);
      },
    });
    return this.templateInicial;
  },
};
