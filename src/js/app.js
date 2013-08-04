document.addEventListener('DOMComponentsLoaded', function() {
    
    var oscillator = document.querySelector('audio-oscillator');
    var keyboard = document.querySelector('audio-keyboard');
    
    console.log(oscillator, keyboard);

    console.log(MIDIUtils.noteToFrequency(4, 0));

    keyboard.addEventListener('keydown', function(e) {
        console.log('keydown event', e, e.detail.index);
        var index = e.detail.index;
        var freq = MIDIUtils.noteToFrequency(index + 4, 4);
        oscillator.noteOn(freq);
    }, false);

    keyboard.addEventListener('keyup', function(e) {
        oscillator.noteOff();
    }, false);
    
    /*oscillator.noteOn(440);

    setTimeout(function() {
        oscillator.noteOff();
    }, 1000);*/

}, false);
