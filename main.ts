import { app, ipcMain, nativeTheme, Menu, BrowserWindow } from 'electron';

import { storeOptions } from './library/store';

import MainWindow from './components/MainWindow';
import Store from './utils/Store';
import createMenu from './components/menu';

// Set env
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;

let mainWindow: MainWindow;

function createWindow() {
    mainWindow = new MainWindow('index.html', isDev);
}

// Init store & defaults
const store = new Store({
    configName: 'user-settings',
    filePath: app.getPath('userData'),
    defaultPath: '',
} as storeOptions);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();

    // Save settings
    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.webContents.send('settings:get', store.get('settings'));
    });

    // Create menu
    const mainMenuTemplate = createMenu(app, mainWindow, isDev);

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Set settings
ipcMain.on('settings:set', (e, value) => {
    store.set('settings', value);
    mainWindow?.webContents.send('settings:get', store.get('settings'));
});

// Add dark mode
ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light';
    } else {
        nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
    mainWindow.close();
});
