const {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} = require('electron');

const path = require('path');

const {
  scanFolderRecursive,
  renameFile
} = require('./file-service');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,

    webPreferences: {
      preload: path.join(
        __dirname,
        'preload.js'
      ),
    
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    }
  });

  mainWindow.loadURL('http://localhost:5173');

  // DEBUG
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle('select-folder', async () => {
  const result =
    await dialog.showOpenDialog({
      properties: ['openDirectory']
    });

  if (result.canceled) {
    return [];
  }

  return await scanFolderRecursive(
    result.filePaths[0]
  );
});

ipcMain.handle(
  'select-output-folder',
  async () => {
    const result =
      await dialog.showOpenDialog({
        properties: ['openDirectory']
      });

    if (result.canceled) {
      return null;
    }

    return result.filePaths[0];
  }
);

ipcMain.handle(
  'rename-file',
  async (
    _,
    oldPath,
    newName,
    outputFolder
  ) => {
    return await renameFile(
      oldPath,
      newName,
      outputFolder
    );
  }
);