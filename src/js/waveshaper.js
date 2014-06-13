
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
var defaultResolution = 512;
var defaultEquation = TWEEN.Easing.Linear.None;

function register() {

	xtag.register('audio-waveshaper', {

		lifecycle: {
			created: function() {
				
				var self = this;

				this.innerHTML = '';

				var canvas = document.createElement('canvas');
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;

				this.canvas = canvas;

				this.appendChild(canvas);

				var select = document.createElement('select');
				this.appendChild(select);


				// TODO provide option to change curve - like a drop down kinda thing? if values have been set with the accessor, curve is 'custom'


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
				this.valuesArray = [-1, 0, 1];
				this.currentResolution = defaultResolution;
				this.currentEquation = defaultEquation;
				this.currentEquationName = null;
				
				// Read attributes set in HTML, if any
				this.initAttributes(['resolution', 'equation']);

				console.log('init');

			},
			renderEquation: function() {

				var curveLength = this.currentResolution;
				var curve = new Float32Array(curveLength);
				var equation = this.equation;

				for(var i = 0; i < curveLength; i++) {
					var elapsed = i * 1.0 / curveLength;
					// The tween equations return values from 0 to 1
					// but we want them to be in -1..1
					curve[i] = equation( elapsed ) * 2 - 1;
				}

				this.value = curve;

			}
		},

		accessors: {
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

					if(this.waveshaper !== null) {
						this.waveshaper.curve = curveF32;
					}

					var canvas = this.canvas;
					var ctx = canvas.getContext('2d');
					ctx.fillStyle = '#000';
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					canvasPlot.graph(canvas, curve);

					if(this.currentEquationName) {
						ctx.fillStyle = '#fff';
						ctx.fillText(this.currentEquationName, 0, 10);
						ctx.fillText('Res = ' + this.currentResolution, 0, 20);
					}

				},

				get: function() {
					return this.waveshaper.curve;
				}
			},
			// Because function is a keyword ;)
			equation: {
				set: function(v) {
					var parts = v.split('.');
					var equation = TWEEN.Easing[parts[0]][parts[1]];
					this.currentEquationName = v;
					this.currentEquation = equation;
					this.renderEquation();
				},
				get: function() {
					return this.currentEquation;
				}
			},
			resolution: {
				set: function(v) {
					this.currentResolution = parseInt(v, 10);
					this.renderEquation();
				},
				get: function() {
					return this.currentResolution;
				}
			}
		}

	});
}

module.exports = {
	register: register
};

