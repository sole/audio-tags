// Wraps the 'native' OscillatorNode and ensures there's always one available to play
// even if it's been destroyed because of a previous stop() call
function OscillatorVoice(context) {
	var internalOscillator = null;
	var output = context.createGain();
	var frequency = 440.0;
	var type = 'sine';
	var gain = 1.0;

	//
	
	// TODO attribute wave type
	Object.defineProperties(this, {
		frequency: {
			set: setFrequency,
			get: function() {
				return frequency;
			}
		},
		type: {
			set: setType,
			get: function() {
				return type;
			}
		},
		gain: {
			set: setGain,
			get: function() {
				return gain;
			}
		},	
	});


	function setFrequency(v) {

		frequency = v;
		if(internalOscillator !== null) {
			internalOscillator.frequency.value = v;
		}

	}


	function setType(v) {

		frequency = v;
		if(internalOscillator !== null) {
			internalOscillator.type = v;
		}

	}


	function setGain(v) {

		gain = v;
		output.gain.value = v;

	}


	//
	
	this.output = output;

	this.start = function(when) {

		when = when !== undefined ? when : 0;

		// The oscillator node is recreated here "on demand",
		// and all the parameters are set too.
		if(internalOscillator === null) {
			internalOscillator = context.createOscillator();
			internalOscillator.type = type;
			internalOscillator.connect(output);
		}

		internalOscillator.frequency.value = frequency;
		internalOscillator.start(when);

	};

	this.stop = function(when) {
		
		if(internalOscillator === null) {
			return;
		}
		
		when = when !== undefined ? when : 0;

		internalOscillator.stop(when);
		internalOscillator = null;

	};
}

module.exports = OscillatorVoice;

