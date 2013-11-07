
var TagPrototype = require('./TagPrototype');
var TWEEN = require('tween.js');

function register() {

	xtag.register('audio-waveshaper', {

		lifecycle: {
			created: function() {
				
				var self = this;

				/*this.innerHTML = 'FILTER<br /><label>frequency<input class="frequency" type="range" min="10" max="24000" /></label>';
				this.frequencyInput = this.querySelector('.frequency');
				this.frequencyInput.addEventListener('change', function(e) {
					self.frequency = parseInt(this.value, 10);
				}, false);*/

				this.innerHTML = 'WAVESHAPER';
				// TODO maybe use a canvas and display the current curve

			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				
				var waveshaper = audioContext.createWaveShaper();
				this.waveshaper = waveshaper;
				
				this.input.connect(waveshaper);
				waveshaper.connect(this.output);

				// TODO read function to use from attribute. If null, use default
				var curveLength = 128;
				var curve = new Float32Array(curveLength);

				for(var i = 0; i < curveLength; i++) {
					var v = i * 1.0 / curveLength;
					//curve[i] = TWEEN.Easing.Linear.None( v );
					curve[i] = TWEEN.Easing.Bounce.Out( v );
				}

				waveshaper.curve = curve;

			},
		},

		accessors: {
			// TODO function?
		}

	});
}

module.exports = {
	register: register
};

