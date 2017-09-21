const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

var path = require('path');
var url = require('url');

let mainWindow;

function createWindow () {
  const windowOptions = {
    width: 800,
    height: 610,
    minWidth: 700,
    minHeight: 360,
    webPreferences: {
      nodeIntegration: false,
      //sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  };

  mainWindow = new BrowserWindow(windowOptions);

  const location = url.format({
    pathname: path.join(__dirname, 'blank.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(location);
  mainWindow.webContents.openDevTools()
  mainWindow.show();
}

app.on('ready', function() {
  console.log('app ready');
  createWindow();
});
