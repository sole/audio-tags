
(function register() {

	var AudioTags = require('AudioTags');
	var TagPrototype = AudioTags.TagPrototype;
	var MIDIUtils = AudioTags.MIDIUtils;

	console.log('mini-synth is registered');

	xtag.register('mini-synth', {

		lifecycle: {
			created: function() {
				console.log('created mini synth');

				// TODO prepare test case and report this as a bug or as a question

				/*this.innerHTML = 
					'<audio-mixer>' +
						'<audio-oscillator frequency="220"></audio-oscillator>' + 
						'<audio-oscillator frequency="440"></audio-oscillator>' + 
					'</audio-mixer>';*/

                var chain = document.createElement('audio-chain');
                this.appendChild(chain);
				
				var mixer = document.createElement('audio-mixer');
				chain.appendChild(mixer);

                for(var i = 0; i < 2; i++) {
					var osc = document.createElement('audio-oscillator');
					osc.frequency = 110 * (i+1);
					mixer.appendChild(osc);
				}

                var filter = document.createElement('audio-filter');
                filter.setAttribute('type', 'allpass');
                chain.appendChild(filter);

			},
			inserted: function() {
				console.log('inserted synth');
			}
		},

		methods: {

			init: function(audioContext) {

				TagPrototype.call(this, audioContext);
				this.initChildren(audioContext);

				this.oscillators = Array.prototype.slice.call(this.querySelectorAll('audio-oscillator'));

			},
			
            start: function(when) {
				// clumsy attempt at not saturating the output
				var oscGain = this.oscillators.length > 0 ? 1.0 / this.oscillators.length : 1.0;
				this.oscillators.forEach(function(osc) {
					osc.gain = oscGain;
					osc.start(when);
				});
			},
			stop: function(when) {
				this.oscillators.forEach(function(osc) {
					osc.stop(when);
				});

			},
			noteOn: function(noteNumber) {
				this.oscillators.forEach(function(osc, index) {
					var oscNoteNumber = noteNumber + 12 * index;
					var frequency = MIDIUtils.noteNumberToFrequency(oscNoteNumber);
					osc.frequency = frequency;
				});
			},
			noteOff: function() {
				this.stop();
			}
		}

	});

})();

