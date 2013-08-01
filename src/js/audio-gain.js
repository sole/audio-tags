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
        }
    });
})();

