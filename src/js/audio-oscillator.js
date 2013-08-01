(function() {
    xtag.register('audio-oscillator', {
        lifecycle: {
            created: function() {
                console.log('created oscillator');
            }
        },
        methods: {
            init: function(audioContext) {
                console.log('init oscillator', audioContext);
                this.audioNode = audioContext.createOscillator();
                // TODO apply config
            },
            noteOn: function(note) {
                this.audioNode.frequency = note;
                console.log('note On TODO:', note, this.audioNode);
                this.audioNode.start(this.audioNode.context.currentTime);
            },
            noteOff: function() {
                this.audioNode.stop(this.audioNode.context.currentTime);
            }
        }
        // TODO: setters/getters for wave type etc
    });
})();
