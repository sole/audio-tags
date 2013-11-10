
var TagPrototype = require('./TagPrototype');

function register() {

	xtag.register('audio-filter', {

		lifecycle: {
			created: function() {
				
				var self = this;

				this.innerHTML = 'FILTER<br />' +
					'<label>frequency<input class="frequency" type="range" min="10" max="24000" /></label><br />' +
					'<label>Q<input class="q" type="range" min="0.0001" max="1000" /></label><br />' +
					'<label>gain<input class="gain" type="range" min="-40" max="40" /></label><br />' +
					'<select class="type"></select>';
				
				this.frequencyInput = this.querySelector('.frequency');
				this.frequencyInput.addEventListener('change', function(e) {
					self.frequency = parseFloat(this.value);
				}, false);


				this.qInput = this.querySelector('.q');
				this.qInput.addEventListener('change', function(e) {
					self.q = parseFloat(this.value);
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


				this.gainInput = this.querySelector('.gain');
				this.gainInput.addEventListener('change', function(e) {
					self.gain = parseFloat(this.value);
				}, false);


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
				this.typeSelect.value = filter.type;
				this.gainInput.value = filter.gain.value;

			},
		},

		accessors: {
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
			},
			gain: {
				set: function(v) {
					this.filter.gain.value = v;
				},
				get: function() { return this.filter.gain.value; }
			}


		}

	});
}

module.exports = {
	register: register
};



