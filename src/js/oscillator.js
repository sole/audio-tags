// TODO refactor away
var componentPrototype = function(audioContext) {
	// input: splitter?
	this.input = audioContext.createGain();
	// output: gain
	this.output = audioContext.createGain();

	this.start = function(when) {
		console.log('prototype start', when);
	};

	this.stop = function(when) {
		console.log('prototype stop', when);
	};
};

var OscillatorVoice = require('./audioComponents/OscillatorVoice');

function register() {
	xtag.register('audio-oscillator', {

		lifecycle: {
			created: function() {
				this.innerHTML = 'OSC <input type="number" /> Hz';
				var frequency = this.querySelector('input[type=number]');
				frequency.value = 440;
				this.frequencyInput = frequency;
				var self = this;
				frequency.addEventListener('change', function() {
					var value = parseInt(frequency.value, 10);
					self.oscillator.frequency = value;
				}, false);
				// TODO Wave type, with spinner...
			}
		},

		methods: {
			init: function(audioContext) {
				componentPrototype.call(this, audioContext);
				this.oscillator = new OscillatorVoice(audioContext);
				this.oscillator.output.connect(this.output);
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
