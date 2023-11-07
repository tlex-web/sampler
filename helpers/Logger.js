import { warn as _warn, info as _info, error as _error, debug as _debug } from 'electron-log/main';

// Update the class to use the logging capabilities of Electron

/**
 * @class Logger
 * @description A class to handle logging
 * @param {string} level - The level of the log
 * @param {string} scope - The scope of the log
 * @param {boolean} production - Whether or not the app is in production
 */
class Logger {
    constructor(level, scope, production = false) {
        this.level = level;
        this.scope = scope;
        this.production = production;
    }

    warn(message) {
        if (this.production) {
            return;
        }

        _warn(message);
    }

    info(message) {
        if (this.production) {
            return;
        }

        _info(message);
    }

    error(message) {
        if (this.production) {
            return;
        }

        _error(message);
    }

    debug(message) {
        if (this.production) {
            return;
        }

        _debug(message);
    }
}

export default Logger;
