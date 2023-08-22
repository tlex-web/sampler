/* eslint-disable no-undef */
const { Application } = require('spectron');
const { app, ipcMain, Menu, BrowserWindow } = require('electron');
const MainWindow = require('../components/MainWindow');
const Store = require('../utils/Store');
const createMenu = require('../components/menu');

jest.mock('../components/MainWindow');
jest.mock('../utils/Store');
jest.mock('../components/menu');

describe('App', () => {
    let application;
    let mainWindow;
    let store;

    beforeEach(async () => {
        application = new Application({
            path: require.resolve('electron'),
            args: ['.'],
        });
        await application.start();

        mainWindow = {
            webContents: {
                on: jest.fn(),
                send: jest.fn(),
            },
        };
        MainWindow.mockImplementation(() => mainWindow);

        store = {
            get: jest.fn(),
            set: jest.fn(),
        };
        Store.mockImplementation(() => store);

        createMenu.mockReturnValue([]);
    });

    afterEach(async () => {
        if (application && application.isRunning()) {
            await application.stop();
        }
        jest.resetAllMocks();
    });

    describe('createWindow', () => {
        test('creates a new MainWindow', () => {
            createWindow();
            expect(MainWindow).toHaveBeenCalledWith('index.html', true);
        });
    });

    describe('app ready event', () => {
        test('creates a new MainWindow', () => {
            app.emit('ready');
            expect(MainWindow).toHaveBeenCalledWith('index.html', true);
        });

        test('saves settings to store', () => {
            store.get.mockReturnValue({ seed: 1 });
            app.emit('ready');
            expect(mainWindow.webContents.on).toHaveBeenCalledWith('dom-ready', expect.any(Function));
            expect(mainWindow.webContents.send).toHaveBeenCalledWith('settings:get', { seed: 1 });
        });

        test('creates a new menu', () => {
            createMenu.mockReturnValue([{ label: 'File' }]);
            app.emit('ready');
            expect(createMenu).toHaveBeenCalledWith(app, mainWindow, true);
            expect(Menu.buildFromTemplate).toHaveBeenCalledWith([{ label: 'File' }]);
            expect(Menu.setApplicationMenu).toHaveBeenCalledWith(expect.any(Menu));
        });

        test('creates a new window on activate event', () => {
            BrowserWindow.getAllWindows.mockReturnValue([]);
            app.emit('activate');
            expect(MainWindow).toHaveBeenCalledWith('index.html', true);
        });
    });

    describe('ipcMain settings:set event', () => {
        test('sets settings in store', () => {
            ipcMain.emit('settings:set', null, { seed: 2 });
            expect(store.set).toHaveBeenCalledWith('settings', { seed: 2 });
        });

        test('sends updated settings to renderer', () => {
            ipcMain.emit('settings:set', null, { seed: 2 });
            expect(mainWindow.webContents.send).toHaveBeenCalledWith('settings:get', { seed: 2 });
        });
    });

    describe('app window-all-closed event', () => {
        test('quits app on non-macOS platforms', () => {
            process.platform = 'win32';
            app.emit('window-all-closed');
            expect(app.quit).toHaveBeenCalled();
        });

        test('does not quit app on macOS platforms', () => {
            process.platform = 'darwin';
            app.emit('window-all-closed');
            expect(app.quit).not.toHaveBeenCalled();
        });
    });

    describe('app close event', () => {
        test('sets mainWindow to null', () => {
            app.emit('close');
            expect(mainWindow).toBeNull();
        });
    });
});
