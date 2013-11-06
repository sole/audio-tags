
var TagPrototype = require('./TagPrototype');

var canvasWidth = 200;
var canvasHeight = 100;
var canvasHalfWidth = canvasWidth * 0.5;
var canvasHalfHeight = canvasHeight * 0.5;
var numSlices = 32;
var inverseNumSlices = 1.0 / numSlices;

function register() {
	xtag.register('audio-oscilloscope', {

		lifecycle: {
			created: function() {
				var canvas = document.createElement('canvas');
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;
				var ctx = canvas.getContext('2d');

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
				
				this.input.connect(analyser);
				analyser.connect(this.output);

				var ctx = this.canvasContext;
				
				update();

				function update() {

					requestAnimationFrame(update);
		
					analyser.getByteTimeDomainData(timeDomainArray);

					ctx.fillStyle = 'rgb(0, 0, 0)';
					ctx.fillRect(0, 0, canvasWidth, canvasHeight);

					ctx.lineWidth = 1;
					ctx.strokeStyle = 'rgb(0, 255, 0)';

					ctx.beginPath();

					var sliceWidth = canvasWidth * 1.0 / bufferLength;
					var x = 0;


					for(var i = 0; i < bufferLength; i++) {

						var v = timeDomainArray[i] / 128.0;
						var y = v * canvasHalfHeight;

						if(i === 0) {
							ctx.moveTo(x, y);
						} else {
							ctx.lineTo(x, y);
						}

						x += sliceWidth;
					}

					ctx.lineTo(canvasWidth, canvasHalfHeight);

					ctx.stroke();

				}

			}
		},

		accessors: {
			// TODO maybe resolution?
		}
	});
}

module.exports = {
	register: register
};

