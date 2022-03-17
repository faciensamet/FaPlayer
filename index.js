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

    
  const {ProgId, ShellOption, Regedit} = require('electron-regedit')
  
  new ProgId({
      description: 'FaPlayer MP4',
      icon: '',
      extensions: ['mp4'],
      shell: [
          new ShellOption({verb: ShellOption.OPEN}),
      ]
  })
  
  Regedit.installAll();

}


const { app, BrowserWindow, ipcMain, Menu, MenuItem, remote, Debugger } = require('electron')
const path = require('path')
const contextMenu = require('electron-context-menu');


//console.log('argv : ' + process.argv.length + " , " + process.argv[0]+ " , " + process.argv[1]+ " , " + process.argv[2] );

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
  
  if(!isDev)
    win.setMenu(null)

  //win.webContents.openDevTools();
  
  win.once('ready-to-show', () => {
    if(process.argv.length>=2)
    {    
      console.log("load-movie");
      win.webContents.send("load-movie", process.argv[1]);
    }
  })

  win.loadFile('index.html');
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
