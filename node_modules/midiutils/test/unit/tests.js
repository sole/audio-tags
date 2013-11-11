
module( 'note names to numbers' );

test( "A-0 is 21", function() {

	equal( MIDIUtils.noteNameToNoteNumber( 'A-0' ), 21 );

});

test( "C-4 is 60 (middle C)", function() {

	equal( MIDIUtils.noteNameToNoteNumber( 'C-4' ), 60 );

});

test( "A-4 is 69", function() {

	equal( MIDIUtils.noteNameToNoteNumber( 'A-4' ), 69 );

});

test( "C-8 is 108", function() {

	equal( MIDIUtils.noteNameToNoteNumber( 'C-8' ), 108 );

});


module( 'note numbers to frequencies' );

test( "21 (A-0) is 27.500", function() {

	equal( MIDIUtils.noteNumberToFrequency( 21 ), 27.500 );

});

test( "60 (C-4) is 261.626", function() {

	equal( Math.abs(MIDIUtils.noteNumberToFrequency( 60 ) - 261.626) < 0.01, true );

});

test( "69 (A-4) is 440.000", function() {

	equal( Math.abs(MIDIUtils.noteNumberToFrequency( 69 ) - 440) < 0.01, true );

});

test( "108 (C-8) is 4186.01", function() {

	equal( Math.abs(MIDIUtils.noteNumberToFrequency( 108 ) - 4186.01) < 0.01, true );

});

module( 'note numbers to names' );

test( "21 is A-0", function() {

	equal( MIDIUtils.noteNumberToName( 21 ), 'A-0' );

});

module( 'frequency to note number');

test( "27.500 is 21", function() {

	equal( MIDIUtils.frequencyToNoteNumber( 27.500 ), 21 );

});

test( "261.626 is 60", function() {

	equal( MIDIUtils.frequencyToNoteNumber( 261.626 ), 60 );

});

test( "440.000 is 69", function() {

	equal( MIDIUtils.frequencyToNoteNumber( 440.000 ), 69 );

});


