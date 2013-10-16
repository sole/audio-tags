var MIDIUtils = {
    noteToFrequency: function(note) {
        return 440.0 * Math.pow(2, (note - 49.0) / 12.0);
    }
};
