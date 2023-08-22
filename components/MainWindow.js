const { BrowserWindow } = require('electron');
const path = require('path');

class MainWindow extends BrowserWindow {
    constructor(file, isDev) {
        super({
            title: 'SamplerIO',
            width: isDev ? 800 : 550,
            height: 700,
            icon: './assets/icons/icon.ico',
            resizable: isDev ? true : false,
            backgroundColor: 'white',
            show: true,
            opacity: 1,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                enableRemoteModule: true,
                preload: path.join(__dirname, 'preload.js'),
            },
        });

        this.loadFile(file);

        if (isDev) {
            this.webContents.openDevTools();
        }
    }
}

module.exports = MainWindow;
