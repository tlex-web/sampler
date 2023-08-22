module.exports = async function globalTeardown() {
    await global.app.stop();
};
