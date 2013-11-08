
var TagPrototype = require('./TagPrototype');

function register() {

	xtag.register('audio-filter', {

		lifecycle: {
			created: function() {
				
				var self = this;

				this.innerHTML = 'FILTER<br />'
					+ '<label>frequency<input class="frequency" type="range" min="10" max="24000" /></label><br />'
					+ '<label>Q<input class="q" type="range" min="0.0001" max="1000" /></label><br />'
					+ '<select class="type"></select>';
				
				this.frequencyInput = this.querySelector('.frequency');
				this.frequencyInput.addEventListener('change', function(e) {
					self.frequency = parseInt(this.value, 10);
				}, false);


				this.qInput = this.querySelector('.q');
				this.qInput.addEventListener('change', function(e) {
					self.q = parseFloat(this.value, 10);
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
				this.qInput.value = filter.Q.value;

				// TODO Same for gain
				this.typeSelect.value = filter.type;
			},
		},

		accessors: {
			// TODO gain
			frequency: {
				set: function(v) {
					this.filter.frequency.value = v;
				},
				get: function() { return this.filter.frequency.value; }
			},
			type: {
				set: function(v) {
					this.filter.type = v;
				},
				get: function() { return this.filter.type; }
			},
			q: {
				set: function(v) {
					this.filter.Q.value = v;
				},
				get: function() { return this.filter.Q; }
			}

		}

	});
}

module.exports = {
	register: register
};



