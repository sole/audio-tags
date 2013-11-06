
var TagPrototype = require('./TagPrototype');
var OscillatorVoice = require('./audioComponents/OscillatorVoice');

function register() {
	xtag.register('audio-oscillator', {

		lifecycle: {
			created: function() {
				// TODO this code is ultra freaking ugly, tidy it up
				this.innerHTML = 'OSC <input type="number" /> Hz';
				// TODO maybe display below the note for that frequency too
				this.frequencyInput = this.querySelector('input[type=number]');
				
				var self = this;
				this.frequencyInput.addEventListener('change', function() {
					var value = parseInt(this.value, 10);
					self.oscillator.frequency = value;
				}, false);
				// TODO Wave type, with spinner...
			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				this.oscillator = new OscillatorVoice(audioContext);
				this.oscillator.output.connect(this.output);

				// Read attributes set in HTML, if any
				// TODO: read wave type
				this.initAttributes(['frequency']);
			},
			start: function(when) {
				this.oscillator.start(when);
			},
			stop: function(when) {
				this.oscillator.stop(when);
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
