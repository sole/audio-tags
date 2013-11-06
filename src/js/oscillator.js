// TODO refactor away
var componentPrototype = function(audioContext) {
	// input: splitter?
	this.input = audioContext.createGain();
	// output: gain
	this.output = audioContext.createGain();
};

function register() {
	xtag.register('audio-oscillator', {
		lifecycle: {
			created: function() {
				this.innerHTML = 'OSC <input type="number" /> Hz';
				var frequency = this.querySelector('input[type=number]');
				frequency.value = 440;
				var self = this;
				frequency.addEventListener('change', function() {
					var value = parseInt(frequency.value, 10);
					self.audioNode.frequency.value = value;
				}, false);
				// TODO Wave type, with spinner...

			}
		},
		methods: {
			init: function(audioContext) {
				componentPrototype.call(this, audioContext);
				this.audioNode = audioContext.createOscillator(); // TODO: oscillatorVoice
				this.audioNode.connect(this.output);
				console.log(this, this.input, this.output);
				//this.audioNode.start(0); // TMP
			}
		}
		// TODO accessor -> frequency
		// set: set freq value + freq input
		// get: return freq value
	});
}

module.exports = {
	register: register
};
