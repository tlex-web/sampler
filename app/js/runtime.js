const { ipcRenderer } = require('electron');
const path = require('path');

let seed;

ipcRenderer.on('settings:get', (e, settings) => {
    seed = settings.seed;
});
