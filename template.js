const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const data = require("./data");
module.exports = {
  geraTrayTemplate(win) {
    const cursos = data.pegaNomeDosCursos();
    const template = cursos.map((item) => ({
      label: item,
      type: "radio",
      click: () => {
        win.send('curso-trocado',item);
      },
    }));
    return template;
  },
};
