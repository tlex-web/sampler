import { ipcRenderer } from 'electron';
import path from 'path';

let seed;

ipcRenderer.on('settings:get', (e, settings) => {
    seed = settings.seed;
});
