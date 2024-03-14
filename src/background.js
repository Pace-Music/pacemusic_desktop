'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'

async function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 800,
    width: 1280,
    height: 800,
    title: "Pace Music",
    titleBarStyle: 'hidden',
    icon: 'icons/512.png',
    movable: true,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegrationInWorker: true,
      autoplayPolicy: 'no-user-gesture-required',
      enableRemoteModule: process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity : true,
    }
  })

  autoUpdater.autoDownload = true,
  autoUpdater.setFeedURL({
    provider: "github",
    owner: "vkidik",
    repo: "pace_music-desktop",
  });
  autoUpdater.on("update-not-available",()=>{
    win.webContents.send("no-updates");
  })
  autoUpdater.on("update-available",()=>{
    autoUpdater.downloadUpdate();
  })
  autoUpdater.on("update-downloaded", (info) => {
    console.log(info);
    win.webContents.send("download-complete");
  });
  autoUpdater.on('download-progress', (progressObj) => {
    win.webContents.send("download-progress",progressObj);
  })

  win.webContents.on('devtools-opened', () => {
    win.focus()
    setImmediate(() => {
      win.focus()
    })
  })

  win.webContents.openDevTools()
  ipcMain.on('WINDOW_MINIMIZE', () => {
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
    win.close();
  });
  ipcMain.on("version",()=>{
    win.webContents.send("version",app.getVersion());
  })
  ipcMain.on("exit",()=>{
      app.quit();
  })
  ipcMain.on("restart",()=>{
    autoUpdater.quitAndInstall(false,true);
    app.relaunch();
  })
  ipcMain.on("check",()=>{
    autoUpdater.checkForUpdates();
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('pacemusic')
    win.loadURL('pacemusic://./index.html')
  }

  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      if (win) {
        if (win.isMinimized()) win.restore()
        win.focus()
      }
    })
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on("open-url",(event,url)=>{
  console.log(url);
  dialog.showErrorBox("Enter",url);
  let enterURL = url
  let $URL = new URL(enterURL);
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
app.on('ready', async () => {
  autoUpdater.checkForUpdatesAndNotify()

  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient('pacemusic', process.execPath, [path.resolve(process.argv[1])])
    }
  } else {
    app.setAsDefaultProtocolClient('pacemusic')
  }

  createWindow()
})