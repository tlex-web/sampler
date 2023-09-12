const log = require('electron-log/main');

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

        log.warn(message);
    }

    info(message) {
        if (this.production) {
            return;
        }

        log.info(message);
    }

    error(message) {
        if (this.production) {
            return;
        }

        log.error(message);
    }

    debug(message) {
        if (this.production) {
            return;
        }

        log.debug(message);
    }
}

module.exports = Logger;
