document.addEventListener('DOMComponentsLoaded', function() {
    
    var oscillator = document.querySelector('audio-oscillator');
    
    console.log(oscillator);
    
    oscillator.noteOn(440);

    setTimeout(function() {
        oscillator.noteOff();
    }, 1000);

}, false);
