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
                //this.audioContext = audioContext;

                this.audioNode = audioContext.createOscillator();
                // TODO apply config
            },
            noteOn: function(frequency) {
                this.audioNode.frequency.value = frequency;
                console.log('note On TODO:', frequency, this.audioNode);
                this.audioNode.start(0);
                //this.audioNode.start(this.audioNode.context.currentTime);
            },
            noteOff: function() {
                var ctx = this.audioNode.context;

                this.audioNode.stop(0);
                this.audioNode.disconnect();

                this.audioNode = ctx.createOscillator();
                
                var parentAudioNode = this.parentNode && this.parentNode.audioNode;
                console.log(parentAudioNode);
                if(parentAudioNode) {
                    this.audioNode.connect(parentAudioNode);
                }
                //this.audioNode.stop(this.audioNode.context.currentTime);
            }
        }
        // TODO: setters/getters for wave type etc
    });
})();
