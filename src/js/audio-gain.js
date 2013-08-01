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

