
var TagPrototype = require('./TagPrototype');

function register() {

	xtag.register('audio-filter', {

		lifecycle: {
			created: function() {
				
				var self = this;

				this.innerHTML = 'FILTER<br /><label>frequency<input class="frequency" type="range" min="10" max="24000" /></label>';
				this.frequencyInput = this.querySelector('.frequency');
				this.frequencyInput.addEventListener('change', function(e) {
					self.frequency = parseInt(this.value, 10);
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
			},
		},

		accessors: {
			// TODO Q, gain
			frequency: {
				set: function(v) {
					this.filter.frequency.value = v;
				},
				get: function() { return this.filter.frequency.value; }
			}
		}

	});
}

module.exports = {
	register: register
};



