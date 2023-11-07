import { BrowserWindow } from 'electron';
import path from 'path';

class MainWindow extends BrowserWindow {
    constructor(file: string, isDev: boolean) {
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
                preload: path.join(__dirname, 'preload.js'),
            },
        });

        this.loadFile(file);

        if (isDev) {
            this.webContents.openDevTools();
        }
    }
}

export default MainWindow;
