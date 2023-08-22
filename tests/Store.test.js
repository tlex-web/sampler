/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const Store = require('../utils/Store');

describe('Store', () => {
    const configName = 'test';
    const defaults = { foo: 'bar' };
    const userDataPath = 'C:\\Users\\test\\AppData\\Roaming\\electron-app';
    const filePath = path.join(userDataPath, configName + '.json');

    beforeEach(() => {
        fs.writeFileSync(filePath, JSON.stringify(defaults));
    });

    afterEach(() => {
        fs.unlinkSync(filePath);
    });

    describe('constructor', () => {
        test('creates an instance of Store', () => {
            const store = new Store({ configName, defaults });
            expect(store).toBeInstanceOf(Store);
        });

        test('sets the path property', () => {
            const store = new Store({ configName, defaults });
            expect(store.path).toEqual(filePath);
        });

        test('sets the data property', () => {
            const store = new Store({ configName, defaults });
            expect(store.data).toEqual(defaults);
        });
    });

    describe('get', () => {
        test('returns the value for the specified key', () => {
            const store = new Store({ configName, defaults });
            const key = 'foo';
            const val = store.get(key);
            expect(val).toEqual(defaults[key]);
        });
    });

    describe('set', () => {
        test('sets the value for the specified key', () => {
            const store = new Store({ configName, defaults });
            const key = 'foo';
            const val = 'baz';
            store.set(key, val);
            const data = JSON.parse(fs.readFileSync(filePath));
            expect(data[key]).toEqual(val);
        });
    });
});
