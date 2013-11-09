
(function register() {

	var AudioTags = require('AudioTags');
	var TagPrototype = AudioTags.TagPrototype;

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
				
				var mixer = document.createElement('audio-mixer');
				this.appendChild(mixer);
				for(var i = 0; i < 2; i++) {
					var osc = document.createElement('audio-oscillator');
					mixer.appendChild(osc);
				}
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
				console.log('the synth has', this.oscillators.length, 'oscillators');

			},
			start: function(when) {
				this.oscillators.forEach(function(osc) {
					osc.start(when);
				});
			},
			stop: function(when) {
				this.oscillators.forEach(function(osc) {
					osc.start(when);
				});

			}
		}

	});

})();

