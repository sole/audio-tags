(function () {
    xtag.register('audio-context', {
        lifecycle: {
            created: function() {
                console.log('created context');
                this.audioContext = new AudioContext();
            },
            inserted: function() {
                console.log('inserted context - init children and connect them top to down?');
                console.log(this.childNodes);
            }
        }
    });
})();
