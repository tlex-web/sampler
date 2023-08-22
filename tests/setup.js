const { Application } = require('spectron');

module.exports = async function globalSetup() {
    const app = new Application({
        path: require('electron'),
        args: ['.'],
    });
    await app.start();
    global.app = app;
};
