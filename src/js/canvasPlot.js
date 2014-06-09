// this module contains code for drawing arrays into canvas

// Draws a simple line-based graph.
// Buffer values are expected to be -1..1
function graph(canvas, buffer) {
	
	var ctx = canvas.getContext('2d');
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var canvasHalfHeight = canvasHeight * 0.5;
	var bufferLength = buffer.length;

	ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(0, 255, 0)';

	ctx.beginPath();

	var sliceWidth = canvasWidth * 1.0 / bufferLength;
	var x = 0;


	for(var i = 0; i < bufferLength; i++) {

		var v = 1 - buffer[i]; // timeDomainArray[i] / 128.0;
		var y = v * canvasHalfHeight;

		if(i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}

		x += sliceWidth;
	}

	ctx.lineTo(canvasWidth, canvasHalfHeight);

	ctx.stroke();

}

var canvasPlot = {
	graph: graph
};

module.exports = canvasPlot;
