'use strict'

import { app, BrowserWindow, ipcMain, protocol } from 'electron'
import { autoUpdater } from 'electron-updater';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import { appData } from '@/coreAPI/getData';
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([
//   { scheme: 'app', privileges: { secure: true, standard: true } }
// ])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 800,
    width: 1280,
    height: 800,
    titleBarStyle: 'hidden',
    movable: true,
    trafficLightPosition: {
      x: 16,
      y: 10
    },
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      devTools: true,
      nodeIntegrationInWorker: true,
      autoplayPolicy: 'no-user-gesture-required',
    }
  })

  ipcMain.on('WINDOW_MINIMIZE', () => {
    // Handle the minimize event
    win.minimize();
  });
  
  ipcMain.on('WINDOW_MAXIMIZE', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  
  ipcMain.on('WINDOW_CLOSE', () => {
    // Handle the close event
    win.close();
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('pacemusic')
    // Load the index.html when not in development
    win.loadURL('pacemusic://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
protocol.registerSchemesAsPrivileged([
  { scheme: 'pacemusic', privileges: { bypassCSP: true } }
])
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // try {
    //   await installExtension(VUEJS3_DEVTOOLS)
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
    
  }
  autoUpdater.checkForUpdatesAndNotify();
  createWindow()
})

autoUpdater.on('update-available', () => {
    console.log("Обнаружено новое обновление")
});

autoUpdater.on('update-downloaded', () => {
    console.log("Обновление загружено и готово к установке")
    autoUpdater.quitAndInstall();
});
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
