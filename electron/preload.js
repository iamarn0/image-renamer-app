const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),

  selectOutputFolder: () =>
    ipcRenderer.invoke('select-output-folder'),

  renameFile: (
    oldPath,
    newName,
    outputFolder
  ) =>
    ipcRenderer.invoke(
      'rename-file',
      oldPath,
      newName,
      outputFolder
    )
});