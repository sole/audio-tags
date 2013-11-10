var TagPrototype = require('./tagPrototype');

function register() {
    
    console.log('Registering Audio Tags');

    require('./chain').register();
    require('./context').register();
    require('./filter').register();
    require('./keyboard').register();
    require('./mixer').register();
    require('./oscillator').register();
    require('./oscilloscope').register();
    require('./vumeter').register();
    require('./waveshaper').register();

    console.log('AudioTags registered');

}

module.exports = {
    register: register,
    TagPrototype: TagPrototype
};
