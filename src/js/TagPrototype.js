
var TagPrototype = function(audioContext) {
	// input: splitter?
	this.input = audioContext.createGain();
	// output: gain
	this.output = audioContext.createGain();

	this.start = function(when) {
		console.log('prototype start', when);
	};

	this.stop = function(when) {
		console.log('prototype stop', when);
	};

	this.initChildren = function(audioContext) {

		var self = this;

		Array.prototype.slice.call(this.children, 0).forEach(function(child) {
			if(child.init) {
				child.init(audioContext);
				child.output.connect(self.output);
			} else {
				console.log('no child init', child);
			}
		});

	};
};

module.exports = TagPrototype;

