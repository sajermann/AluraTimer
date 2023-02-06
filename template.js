const { ipcMain } = require("electron");
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
  geraMenuPrincipalTemplate(app) {
    let temaplateMenu = [
      {
        label: "View",
        submenu: [
          {role: "reload"},
          {role: "toggledevtools"},
        ],
      },
      {
        label: "Sobre",
        submenu: [
          {
            label: "Sobre o Alura Timer",
            accelerator:"CommandOrControl+I",
            click: () => {
              ipcMain.emit("abrir-janela-sobre");
            },
          },
        ],
      },
    ];

    if (process.platform === "darwin") {
      temaplateMenu.unshift({
        label: app.getName(),
        submenu: [
          {
            label: "Estou rodando no MAC",
          },
        ],
      });
    }
    return temaplateMenu;
  },
};
