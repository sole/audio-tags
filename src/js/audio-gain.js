(function() {
    xtag.register('audio-gain', {
        lifecycle: {
            created: function() {
                console.log('created gain');
                console.log(this.parentNode.tagName.toLowerCase());
            },
            inserted: function() {
                console.log('inserted gain', this. parentNode);
            }
        },
        methods: {
            init: function(audioContext) {
                console.log('init!');
                this.audioNode = audioContext.createGain();

                console.log('TODO: if this node has children, it has to initialise them too');

            }
        }
    });
})();

