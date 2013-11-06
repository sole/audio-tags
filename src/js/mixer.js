
var TagPrototype = require('./TagPrototype');

function register() {
	xtag.register('audio-mixer', {

		lifecycle: {
			created: function() {
			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				this.initChildren(audioContext);
			}
		}

	});
}

module.exports = {
	register: register
};
