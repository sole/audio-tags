
var TagPrototype = require('./TagPrototype');

function register() {
	xtag.register('audio-mixer', {

		lifecycle: {
			created: function() {
			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				
				this.initChildren(audioContext);

			}
		},

		accessors: {
			frequency: {
				get: function() {
					return this.oscillator.frequency;
				},
				set: function(v) {
					v = parseInt(v, 10);
					this.oscillator.frequency = v;
					this.frequencyInput.value = v;
				}
			}
		}
	});
}

module.exports = {
	register: register
};
