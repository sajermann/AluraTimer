const { app, BrowserWindow } = require('electron');


app.on('ready', ()=>{
  console.log('Aplicacao iniciada');

  let mainWindow = new BrowserWindow({
    window: 600,
    height: 400
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
});

app.on('window-all-close', ()=>{
  app.quit();
})