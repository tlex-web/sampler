import electron from 'electron';
import path from 'path';
import fs from 'fs';

interface options {
    configName: string;
    defaults: any;
}

class Store {
    path: string;
    data: any;
    constructor(options: options) {
        const userDataPath = electron.app.getPath('userData');

        this.path = path.join(userDataPath, options.configName + '.json');
        this.data = this.parseDataFile(this.path, options.defaults);
    }

    get(key: string) {
        return this.data[key];
    }

    set(key: string, val: any) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }

    parseDataFile(filePath: string, defaults: any) {
        try {
            return JSON.parse(fs.readFileSync(filePath).toString()) || defaults;
        } catch (err) {
            return defaults;
        }
    }
}

export default Store;
