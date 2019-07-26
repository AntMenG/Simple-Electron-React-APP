const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let dataWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 680, 
    webPreferences: { 
      webSecurity: false
    }
  });
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : 
    `file://${path.join(__dirname, '../build/index.html')}`
  );

  dataWindow = new BrowserWindow({
    width: 355, 
    height: 500, 
    parent: mainWindow,
    show: false
  });
  dataWindow.loadURL(
    isDev ? 'http://localhost:3000/data' : 
    `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => mainWindow = null);
  dataWindow.on('close', (e) => {
    e.preventDefault();
    dataWindow.hide();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('toggle-data', (event, arg) => {
  dataWindow.show();
  dataWindow.webContents.send('data', arg);
})