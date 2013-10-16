(function () {
    xtag.register('audio-context', {
        lifecycle: {
            created: function() {
                console.log('created context');
                this.audioContext = new AudioContext();
            },
            inserted: function() {
                var audioContext = this.audioContext;
                Array.prototype.slice.apply(this.childNodes).forEach(function(node) {
                    if(node.init) {
                        node.init(audioContext);

                        // Finally connect the newly created node
                        node.audioNode.connect(audioContext.destination);
                    }
                });
            }
        }
    });
})();
