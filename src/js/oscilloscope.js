
var TagPrototype = require('./TagPrototype');

function register() {
	xtag.register('audio-oscilloscope', {

		lifecycle: {
			created: function() {
				this.innerHTML = 'oscilloscope';
			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				var analyser = audioContext.createAnalyser();
				this.input.connect(analyser);
				analyser.connect(this.output);
				console.log(analyser);
			}
		},

		accessors: {
			// TODO maybe resolution?
		}
	});
}

module.exports = {
	register: register
};

