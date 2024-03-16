'use strict'

import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
const packageJson = require('../package.json');

const protocolName = packageJson.protocol;

async function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 800,
    width: 1280,
    height: 800,
    title: "Pace Music",
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'icons/512.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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
  autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.on("update-not-available", () => {
    win.webContents.send("no-updates");
  });
  autoUpdater.on("update-available", () => {
    autoUpdater.downloadUpdate();
  });
  autoUpdater.on("update-downloaded", (info) => {
    win.webContents.send("download-complete", info);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    win.webContents.send("download-progress", progressObj);
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    await win.loadURL(`file://${path.join(__dirname, 'index.html')}`);
  }

  setupIpcMainListeners(win);
}

function setupIpcMainListeners(win) {
  ipcMain.on('WINDOW_MINIMIZE', () => win.minimize());
  ipcMain.on('WINDOW_MAXIMIZE', () => win.isMaximized() ? win.unmaximize() : win.maximize());
  ipcMain.on('WINDOW_CLOSE', () => win.close());
  ipcMain.on("version", () => win.webContents.send("version", app.getVersion()));
  ipcMain.on("exit", () => app.quit());
  ipcMain.on("restart", () => {
    autoUpdater.quitAndInstall();
    app.relaunch();
  });
  ipcMain.on("check", () => autoUpdater.checkForUpdates());
}

app.on('ready', async () => {
  protocol.registerFileProtocol(`${protocolName}`, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '');
    callback({ path: path.normalize(`${__dirname}/${url}`) });
  });

  createWindow();
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win.isMinimized()) win.restore();
    win.focus();
  });
}