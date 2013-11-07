
var TagPrototype = require('./TagPrototype');
var TWEEN = require('tween.js');

var graphs_list = [
	[ 'Linear.None' ],
	[ 'Quadratic.In', 'Quadratic.Out', 'Quadratic.InOut' ],
	[ 'Cubic.In', 'Cubic.Out', 'Cubic.InOut' ],
	[ 'Quartic.In', 'Quartic.Out', 'Quartic.InOut' ],
	[ 'Quintic.In', 'Quintic.Out', 'Quintic.InOut' ],
	[ 'Sinusoidal.In', 'Sinusoidal.Out', 'Sinusoidal.InOut' ],
	[ 'Exponential.In', 'Exponential.Out', 'Exponential.InOut' ],
	[ 'Circular.In', 'Circular.Out', 'Circular.InOut' ],
	[ 'Elastic.In', 'Elastic.Out', 'Elastic.InOut' ],
	[ 'Back.In', 'Back.Out', 'Back.InOut' ],
	[ 'Bounce.In', 'Bounce.Out', 'Bounce.InOut' ]
];

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

				// TODO read which function to use from attribute. If null, use default
				var curveLength = 512;
				var curve = new Float32Array(curveLength);

				for(var i = 0; i < curveLength; i++) {
					var v = i * 1.0 / curveLength;
					//curve[i] = TWEEN.Easing.Linear.None( v );
					curve[i] = TWEEN.Easing.Bounce.Out( v );
				}

				waveshaper.curve = curve;

				// var parts = title.split('.'),
				// tweenEasing = TWEEN.Easing[parts[0]][parts[1]],

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

