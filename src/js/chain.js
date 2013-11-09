
var TagPrototype = require('./TagPrototype');

// TODO silly idea -> use a 'chain' background
function register() {
	xtag.register('audio-chain', {

		lifecycle: {
			created: function() {
			}
		},

		methods: {
			init: function(audioContext) {
				TagPrototype.call(this, audioContext);
				this.initChildren(audioContext);
			},
			// Chains connect the nth-child to the nth-1 child (for n>0)
			// and the last child to our output
			initChild: function(audioContext, child, index) {
				console.log('initialising a child in the chain', child, index);
				
				if(child.init) {
					child.init(audioContext);
				} else {
					console.log('chain-no child init?', child);
				}

				if(index > 0) {
					var prevChild = this.children[index - 1];
					prevChild.output.connect(child.input);
				}

				var numChildren = this.children.length;
				if(index === numChildren - 1) {
					child.output.connect(this.output);
				}

			}
		}

	});
}

module.exports = {
	register: register
};

