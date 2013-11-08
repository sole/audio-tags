
var TagPrototype = require('./TagPrototype');

function register() {

	xtag.register('audio-filter', {

		lifecycle: {
			created: function() {
				
				var self = this;

				this.innerHTML = 'FILTER<br /><label>frequency<input class="frequency" type="range" min="10" max="24000" /></label>'
					+ '<select class="type"></select>';
				
				this.frequencyInput = this.querySelector('.frequency');
				this.frequencyInput.addEventListener('change', function(e) {
					self.frequency = parseInt(this.value, 10);
				}, false);

				this.typeSelect = this.querySelector('.type');
				this.typeSelect.addEventListener('change', function(e) {
					self.type = self.typeSelect.value;
				}, false);
				["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"].forEach(function(t) {
					var option = document.createElement('option');
					option.innerHTML = t;
					option.value = t;
					self.typeSelect.appendChild(option);
				});


				// TODO Q, gain
			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				
				var filter = audioContext.createBiquadFilter();
				this.filter = filter;
				
				this.input.connect(filter);
				filter.connect(this.output);

				this.frequencyInput.value = filter.frequency.value;
				// TODO Same for Q, gain
			},
		},

		accessors: {
			// TODO Q, gain
			frequency: {
				set: function(v) {
					this.filter.frequency.value = v;
				},
				get: function() { return this.filter.frequency.value; }
			},
			type: {
				set: function(v) {
					console.log('change type', v);
					this.filter.type = v;
				},
				get: function() { return this.filter.type; }
			}
		}

	});
}

module.exports = {
	register: register
};



