
var TagPrototype = require('./TagPrototype');
var canvasPlot = require('./canvasPlot');

var canvasWidth = 200;
var canvasHeight = 100;
//var canvasHalfWidth = canvasWidth * 0.5;
//var canvasHalfHeight = canvasHeight * 0.5;

function register() {
	
	xtag.register('audio-oscilloscope', {

		lifecycle: {
			created: function() {
				var canvas = document.createElement('canvas');
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;
				var ctx = canvas.getContext('2d');

				this.canvas = canvas;
				this.canvasContext = ctx;

				this.appendChild(canvas);
			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				
				var analyser = audioContext.createAnalyser();
				analyser.fftSize = 2048;
				var bufferLength = analyser.frequencyBinCount;
				var timeDomainArray = new Uint8Array(bufferLength);
				var floatTimes = new Float32Array(bufferLength);
				
				this.input.connect(analyser);
				analyser.connect(this.output);

				var canvas = this.canvas;
				
				update();

				function update() {

					requestAnimationFrame(update);
		
					analyser.getByteTimeDomainData(timeDomainArray);

					// Map the 0..255 unsigned byte values to -1..1 for the canvasPlot.graph call
					for(var i = 0; i < bufferLength; i++) {
						floatTimes[i] = timeDomainArray[i] / 128 - 1;
					}

					canvasPlot.graph(canvas, floatTimes);

				}

			}
		},

		accessors: {
			// TODO maybe resolution? (fftSize)
		}
	});
}

module.exports = {
	register: register
};

