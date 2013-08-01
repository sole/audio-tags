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
                var audioContext = this.audioContext;
                Array.prototype.slice.apply(this.childNodes).forEach(function(node) {
                    console.log(node, node.tagName);
                    if(node.init) {
                        node.init(audioContext);
                        console.log(node.audioNode);

                        // Finally connect the newly created node
                        node.audioNode.connect(audioContext.destination);
                    }
                });
            }
        }
    });
})();
