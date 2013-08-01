(function() {
    xtag.register('audio-oscillator', {
        lifecycle: {
            created: function() {
                console.log('created oscillator');
                //this.audioContext = new AudioContext();
                // need to attach to the parent
                console.log(this.parent);
            }
        },
        methods: {
            init: function(audioContext) {
                console.log('init oscillator', audioContext);
                this.audioNode = audioContext.createOscillator();
                // TODO apply config
            }
        }
        // TODO: setters/getters for wave type etc
    });
})();
