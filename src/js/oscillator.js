
var TagPrototype = require('./TagPrototype');
var OscillatorVoice = require('./audioComponents/OscillatorVoice');
var MIDIUtils = require('midiutils');

function register() {
	xtag.register('audio-oscillator', {

		lifecycle: {
			created: function() {
				this.innerHTML = 'OSCILLATOR<br />' + 
					'<label><select class="type"></select> type</label><br />' +
					//'<label><input type="number" min="0" max="24000" /> Hz</label><br />' +
					'<label class="frequency"><input type="range" min="1" max="12000" step="0.5" /><span></span> Hz</label><br />' +
					'<label class="note"><span></span></label>';

				
				var self = this;

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

				this.frequencyInput = this.querySelector('.frequency input');
				this.frequencySpan = this.querySelector('.frequency span');
				this.noteSpan = this.querySelector('.note span');

				this.frequencyInput.addEventListener('change', function() {
					var value = parseFloat(this.value);
					self.frequency = value;
				}, false);

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
					v = parseFloat(v);
					if(this.oscillator) {
						this.oscillator.frequency = v;
					}
					this.frequencyInput.value = v;
					this.frequencySpan.innerHTML = Math.round(v);

					var note = MIDIUtils.noteNumberToName(MIDIUtils.frequencyToNoteNumber(v));
					this.noteSpan.innerHTML = note !== undefined ? note : "";
				},
			},
			type: {
				set: function(v) {
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
