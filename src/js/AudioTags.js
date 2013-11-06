function register() {
    console.log('Registering Audio Tags');
    require('./context').register();
    require('./oscillator').register();

    console.log('AudioTags registered');
}

module.exports = {
    register: register
};
