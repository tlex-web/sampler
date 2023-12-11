import electron from 'electron';
import path from 'path';
import fs from 'fs';

import { storeOptions, storeData } from '../library/store';

class Store {
    path: string;
    data: storeData;

    constructor(options: storeOptions) {
        const userDataPath = electron.app.getPath('userData');

        this.path = path.join(userDataPath, options.configName + '.json') ? options.filePath : options.defaultPath;
        this.data = this.parseDataFile(this.path, options.defaultPath);
    }

    get(key: string) {
        return this.data[key];
    }

    set(key: string, val: string) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }

    parseDataFile(filePath: string, defaults: string) {
        try {
            return JSON.parse(fs.readFileSync(filePath).toString()) || defaults;
        } catch (err) {
            return defaults;
        }
    }
}

export default Store;
