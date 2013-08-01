(function() {
    xtag.register('audio-oscillator', {
        lifecycle: {
            created: function() {
                console.log('created oscillator');
                //this.audioContext = new AudioContext();
                // need to attach to the parent
                console.log(this.parent);
            }
        }
    });
})();
