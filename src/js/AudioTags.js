function register() {
    
    console.log('Registering Audio Tags');

    require('./chain').register();
    require('./context').register();
    require('./filter').register();
    require('./mixer').register();
    require('./oscillator').register();
    require('./oscilloscope').register();
    require('./vumeter').register();

    console.log('AudioTags registered');

}

module.exports = {
    register: register
};
