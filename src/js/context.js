function register() {
	xtag.register('audio-context', {
		lifecycle: {
			created: function() {
				console.log('created audio contex');
				this.audioContext = new AudioContext();
			},
			inserted: function() {
				console.log('inserted audio context, now going through child nodes and seeing what we do with them');

				var audioContext = this.audioContext;

				Array.prototype.slice.call(this.children, 0).forEach(function(child) {
					if(child.init) {
						child.init(audioContext);
						child.output.connect(audioContext.destination);
					} else {
						console.log('no child init', child);
					}
				});
			}
		}
	});
}

module.exports = {
	register: register
};
