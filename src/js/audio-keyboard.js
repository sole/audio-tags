(function () {

    function initLayout(kb) {
        
        var numBlacks = kb.blacks.length;

        kb.innerHTML = '';
        kb.classList.add('keyboard');
        
        for(var i = 0; i < kb.numOctaves; i++) {

            for(var j = 0; j < numBlacks; j++) {

                var isBlack = kb.blacks[j],
                    keyDiv = document.createElement( 'div' ),
                    index = j + numBlacks * i,
                    label = kb.keyboardLayout[ index ];

                keyDiv.className = isBlack ? kb.keyBlackClass : kb.keyClass;
                keyDiv.innerHTML = label;
                keyDiv.dataset.index = index;

                kb.keys.push( keyDiv );

                kb.appendChild( keyDiv );

            }
        }
    }

    xtag.register('audio-keyboard', {
        lifecycle: {
            created: function() {
                // TODO read attributes
                this.numOctaves = 1;
                this.keyClass = 'key';
                this.keyBlackClass = 'key black';
                this.keyboardLayout = 'ZSXDCVGBHNJMQ2W3ER5T6Y7U'.split('');
                this.blacks = [ false, true, false, true, false, false, true, false, true, false, true, false ];
                
                this.keys = [];

                initLayout(this);

            },
        }
    });

})();
