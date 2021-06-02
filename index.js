const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
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

//ipcMain.on('load-movie', (event, arg) => {
  //event.reply("load-movie", arg);
//})