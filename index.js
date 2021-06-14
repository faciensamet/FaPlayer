//for update
require('update-electron-app')({
  repo: 'faciensamet/FaPlayer',
  updateInterval: '1 hour',
  notifyUser: false
})


const { app, BrowserWindow, ipcMain, Menu, MenuItem, remote } = require('electron')
const path = require('path')
const contextMenu = require('electron-context-menu');
const isDev = require('electron-is-dev');

if (isDev) {
	console.log('Running in development');
} else {
	console.log('Running in production');
}

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

contextMenu({
	prepend: (defaultActions, parameters, browserWindow) => [
		{
			label: 'Rainbow',
			// Only show it when right-clicking images
			visible: parameters.mediaType === 'image'
		},
		{
			label: 'Search Google for “{selection}”',
			// Only show it when right-clicking text
			visible: parameters.selectionText.trim().length > 0,
			click: () => {
				shell.openExternal(`https://google.com/search?q=${encodeURIComponent(parameters.selectionText)}`);
			}
		}
	]
});