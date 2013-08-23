jQuery(document).ready(function($) {
    (function() {
        var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L',
                        'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        position = 0;
        $letter = $('#letter');
        $current_word = $('#current_word'),
        self = this;

        this.nextLetter = function() {
            position = (position + 1) % alphabet.length;
            $letter.text(alphabet[position]);
        };

        this.resetLetter = function() {
            position = 0;
            $letter.text(alphabet[position]);
        };

        this.timer = function() {
            var timer_milliseconds = 200;
            setTimeout(function() {
                self.nextLetter();
                self.timer();
            }, timer_milliseconds)
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