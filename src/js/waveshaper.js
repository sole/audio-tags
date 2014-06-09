
var TWEEN = require('tween.js');
var TagPrototype = require('./TagPrototype');
var canvasPlot = require('./canvasPlot');


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

var canvasWidth = 200;
var canvasHeight = 100;

function register() {

	xtag.register('audio-waveshaper', {

		lifecycle: {
			created: function() {
				
				var self = this;

				this.valuesArray = [-1, 0, 1];

				this.innerHTML = '';

				var canvas = document.createElement('canvas');
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;

				this.canvas = canvas;

				this.appendChild(canvas);


				// TODO provide option to change curve - like a drop down kinda thing?

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

				//this.value = curve;

				// var parts = title.split('.'),
				// tweenEasing = TWEEN.Easing[parts[0]][parts[1]],

			},
		},

		accessors: {
			// TODO function - from the tween list, and it will be rendered
			// TODO function resolution, default 512?

			// Can be a comma separated list of values or an array
			// Examples: this.value = '1,2,3' or this.value = '-0.5,1,0';
			// also: this.value = [1,2,3,4]
			// the comma separated version should be most handy when declaring the component in html, with an attribute

			// If values are out of the -1, 1 range they will be capped
			value: {
				set: function(v) {

					var vType = typeof v;
					var curve;

					if(vType === 'string') {
						curve = v.split(',');
					} else { // TODO might want to do some more validation such as .length property...?
						curve = v;
					}

					var curveF32 = new Float32Array(curve.length);

					for(var i = 0; i < curve.length; i++) {
						var c = curve[i] * 1;
						if(c <= -1) {
							c = -1;
						} else if(c >= 1) {
							c = 1;
						}
						curveF32[i] = c;
					}

					this.waveshaper.curve = curveF32;

					canvasPlot.graph(this.canvas, curve);

				},

				get: function() {
					return this.waveshaper.curve;
				}
			}
		}

	});
}

module.exports = {
	register: register
};

