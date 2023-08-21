// Create a custom menu bar

const createMenu = (app, window, isDev) => {
    const mainMenuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click() {
                        window.webContents.send('new-file');
                    },
                },
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        window.webContents.send('open-file');
                    },
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click() {
                        window.webContents.send('save-file');
                    },
                },
                {
                    label: 'Save As',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click() {
                        window.webContents.send('save-as-file');
                    },
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click() {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    click() {
                        window.webContents.send('undo');
                    },
                },
                {
                    label: 'Redo',
                    accelerator: 'CmdOrCtrl+Shift+Z',
                    click() {
                        window.webContents.send('redo');
                    },
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    click() {
                        window.webContents.send('cut');
                    },
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    click() {
                        window.webContents.send('copy');
                    },
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    click() {
                        window.webContents.send('paste');
                    },
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    click() {
                        window.webContents.send('select-all');
                    },
                },
            ],
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Zoom In',
                    accelerator: 'CmdOrCtrl+=',
                    click() {
                        window.webContents.send('zoom-in');
                    },
                },
                {
                    label: 'Zoom Out',
                    accelerator: 'CmdOrCtrl+-',
                    click() {
                        window.webContents.send('zoom-out');
                    },
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'F11',
                    click() {
                        window.webContents.send('toggle-full-screen');
                    },
                },
            ],
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    click() {
                        window.minimize();
                    },
                },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    click() {
                        window.close();
                    },
                },
                {
                    label: 'Reopen',
                    accelerator: 'CmdOrCtrl+Shift+T',
                    enabled: false,
                    click() {
                        app.emit('activate');
                    },
                },
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click() {
                        window.webContents.send('about');
                    },
                },
                {
                    label: 'Documentation',
                    click() {
                        window.webContents.send('documentation');
                    },
                },
            ],
        },
    ];

    // If mac, add empty object to menu
    if (process.platform === 'darwin') {
        mainMenuTemplate.unshift({});
    }

    // Add developer tools item if not in production
    if (isDev) {
        mainMenuTemplate.push({
            label: 'Developer Tools',
            submenu: [
                {
                    label: 'Toggle Dev Tools',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click() {
                        window.webContents.toggleDevTools();
                    },
                },
                {
                    role: 'reload',
                    accelerator: 'CmdOrCtrl+R',
                    click() {
                        window.reload();
                    },
                },
            ],
        });
    }

    return mainMenuTemplate;
};

module.exports = createMenu;
