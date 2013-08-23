jQuery(document).ready(function($) {
    (function() {
        var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L',
                        'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        position = 0;
        $letter = $('#letter');
        $current_word = $('#current_word'),
        self = this;

        this.nextLetter = function() {
            position++;
            if (position > alphabet.length) {
                position = 0;
            }

            $letter.text(alphabet[position]);
        };

        this.resetLetter = function() {
            position = 0;
            $letter.text(alphabet[position]);
        };

        this.timer = function() {
            setTimeout(function() {
                self.nextLetter();
                self.timer();
            }, 2000)
        };

        this.addLetter = function() {
            $current_word.text($current_word.text() + $letter.text())
        };

        this.timer();

        $letter.click(function() {
            self.addLetter();
            self.resetLetter();
            return false;
        });
    })();

});