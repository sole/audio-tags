var MIDIUtils = {
    noteToFrequency: function(note, octaveTransposition) {
        //octave = octave !== undefined ? octave : 4.0;
        //return 440.0 * Math.pow(2, ((note - 57.0 + (octave - 4.0) * 12.0) / 12.0));
        octaveTransposition = octaveTransposition !== undefined ? octaveTransposition : 0;
        return 440.0 * Math.pow(2, (note - 49.0 + octaveTransposition * 12.0) / 12.0);
        //return 440.0 * Math.pow(2, note / 12.0);
    }
};
