
var TagPrototype = require('./TagPrototype');
var OscillatorVoice = require('./audioComponents/OscillatorVoice');

function register() {
	xtag.register('audio-oscillator', {

		lifecycle: {
			created: function() {
				this.innerHTML = 'OSC<br />' + 
					'<label><input type="number" min="0" max="24000" /> Hz</label><br />' +
					'<label><select class="type"></select> type</label>';
				// TODO maybe display below the note for that frequency too
				this.frequencyInput = this.querySelector('input[type=number]');
				
				var self = this;
				this.frequencyInput.addEventListener('change', function() {
					var value = parseFloat(this.value);
					self.oscillator.frequency = value;
				}, false);

				// TODO Wave type but with spinner...

				this.typeSelect = this.querySelector('.type');
				this.typeSelect.addEventListener('change', function(e) {
					self.type = self.typeSelect.value;
				}, false);
				["sine", "square", "sawtooth", "triangle"].forEach(function(t) {
					var option = document.createElement('option');
					option.innerHTML = t;
					option.value = t;
					self.typeSelect.appendChild(option);
				});

			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				this.oscillator = new OscillatorVoice(audioContext);
				this.oscillator.output.connect(this.output);

				// Read attributes set in HTML, if any
				this.initAttributes(['frequency', 'type']);
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
					if(this.oscillator) {
						this.oscillator.frequency = v;
					}
					this.frequencyInput.value = v;
				},
			},
			type: {
				set: function(v) {
					console.log('set type', v);
					if(this.oscillator) {
						this.oscillator.type = v;
					}
					this.typeSelect.value = v;
				},
				get: function() {
					return this.oscillator.type;
				}
			}
		}
	});
}

module.exports = {
	register: register
};
