import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'), // <-- Remove or ensure this file exists
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // ✅ Load built Vite HTML file
  win.loadFile(path.join(__dirname, 'dist/index.html'));

  // Optional: Open devtools for debugging
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
