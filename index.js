const isDev = require('electron-is-dev');

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');

  //for update
  require('update-electron-app')({
    repo: 'faciensamet/FaPlayer',
    updateInterval: '1 hour',
    notifyUser: false
  })

}


const { app, BrowserWindow, ipcMain, Menu, MenuItem, remote } = require('electron')
const path = require('path')
const contextMenu = require('electron-context-menu');


console.log('argv : ' + process.argv);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    //frame: false
  })
  
  //if(!isDev)
    win.setMenu(null)

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
