const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require("electron");
const data = require("./data.js");
const templateGenerator = require("./template");
const template = require("./template");

let tray = null;
let mainWindow = null;

app.on("ready", () => {
  console.log("Aplicacao iniciada");

  mainWindow = new BrowserWindow({
    width: 900,
    height: 500,
  });
  tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
  let trayMenu = Menu.buildFromTemplate(template.geraTrayTemplate(mainWindow));
  tray.setContextMenu(trayMenu);



  let menuPrincipal = Menu.buildFromTemplate(template.geraMenuPrincipalTemplate(app));
  Menu.setApplicationMenu(menuPrincipal);
  
  globalShortcut.register('CmdOrCtrl+Shift+S', ()=>{
    mainWindow.send('atalho-iniciar-parar')
  })


  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on("window-all-close", () => {
  app.quit();
});

let aboutWindow = null;
ipcMain.on("abrir-janela-sobre", () => {
  if (aboutWindow) return;
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 200,
    alwaysOnTop: true,
    frame: false,
  });

  aboutWindow.on("closed", () => {
    aboutWindow = null;
  });

  aboutWindow.loadURL(`file://${__dirname}/app/about/index.html`);
});

ipcMain.on("close-window-about", () => {
  console.log("Fechando About...");
  aboutWindow.close();
});

ipcMain.on("curso-parado", (event, curso, tempoEstudado) => {
  data.salvaDados(curso, tempoEstudado);
});

ipcMain.on("curso-adicionado", (_, novoCurso) => {
  let novoTemplate = templateGenerator.adicionaCursoNoTray(
    novoCurso,
    mainWindow
  );
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  tray.setContextMenu(novoTrayMenu);
});
