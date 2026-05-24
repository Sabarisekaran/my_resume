const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'sabari_sekaran_resume.html');
const pdfFile = path.join(__dirname, 'sabari_sekaran_resume.pdf');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const fileUrl = `file://${htmlFile}`;
  mainWindow.loadURL(fileUrl);

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.webContents.print({ silent: true, printBackground: true }, (success, failureReason) => {
      if (!success) console.log(failureReason);
    });

    mainWindow.webContents.printToPDF({
      margins: { marginType: 0 },
      pageSize: 'A4',
      printBackground: true
    }).then(data => {
      fs.writeFile(pdfFile, data, (err) => {
        if (err) {
          console.error('Error writing PDF:', err);
        } else {
          console.log(`PDF created successfully with full CSS styling: ${pdfFile}`);
        }
        app.quit();
      });
    }).catch(err => {
      console.error('Error creating PDF:', err);
      app.quit();
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
