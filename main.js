const { app, BrowserWindow, ipcMain } = require("electron");
const data = require('./data.js')

app.on("ready", () => {
  console.log("Aplicacao iniciada");

  let mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on("window-all-close", () => {
  app.quit();
});

let aboutWindow = null;
ipcMain.on("open-window-about", () => {
  if (aboutWindow) return;
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 200,
    alwaysOnTop: true,
    frame: false
  });

  aboutWindow.on("closed", () => {
    aboutWindow = null;
  });

  aboutWindow.loadURL(`file://${__dirname}/app/about/index.html`);


});

ipcMain.on('close-window-about',()=>{
  console.log('Fechando About...')
  aboutWindow.close()
})

ipcMain.on('curso-parado',(event, curso, tempoEstudado)=>{
  data.salvaDados(curso, tempoEstudado)


})