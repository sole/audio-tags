
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

	// Inspired by the visitor pattern... if classes overload initChild, that
	// implementation will be executed instead of the normal behaviour
	// (connecting each child output to our output) - see initChild
	// This allows us to have different initialisations depending on the type of
	// container node
	this.initChildren = function(audioContext) {

		var self = this;

		Array.prototype.slice.call(this.children, 0).forEach(function(child, index) {
			self.initChild(audioContext, child, index);
		});

	};

	this.initChild = function(audioContext, child, index) {
		
		if(child.init) {
			child.init(audioContext);
			child.output.connect(this.output);
		} else {
			console.log('no child init', child);
		}

	};

	this.initAttributes = function(which) {
		var self = this;
		which.forEach(function(attr) {
			var value = self.getAttribute(attr);
			if(value !== null) {
				self[attr] = value;
			}
		});
	};
};

module.exports = TagPrototype;

