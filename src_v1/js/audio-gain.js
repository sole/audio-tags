(function() {
    xtag.register('audio-gain', {
        lifecycle: {
            created: function() {
                console.log('created gain');
            },
            inserted: function() {
            }
        },
        methods: {
            init: function(audioContext) {
                this.audioNode = audioContext.createGain();

                var audioNode = this.audioNode;

                // TODO REFACTOR
                Array.prototype.slice.apply(this.childNodes).forEach(function(node) {
                    if(node.init) {
                        node.init(audioContext);
                        node.audioNode.connect(audioNode);
                    }
                });

            }
        }
    });
})();

