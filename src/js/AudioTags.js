function register() {
    
    console.log('Registering Audio Tags');

    require('./context').register();
    require('./oscillator').register();
    require('./mixer').register();

    console.log('AudioTags registered');

}

module.exports = {
    register: register
};
