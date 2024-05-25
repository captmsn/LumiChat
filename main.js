const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false, // Remove the default frame
  });

  win.loadURL('http://localhost:8080');
}

ipcMain.on('save-character', (event, character, imagePath) => {
  const charactersDir = path.join(__dirname, 'characters');
  if (!fs.existsSync(charactersDir)) {
    fs.mkdirSync(charactersDir);
  }

  const characterFile = path.join(charactersDir, `${character.name}.json`);
  fs.writeFileSync(characterFile, JSON.stringify(character, null, 2));

  if (imagePath) {
    const imageFile = path.join(charactersDir, `${character.name}${path.extname(imagePath)}`);
    fs.copyFileSync(imagePath, imageFile);
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
