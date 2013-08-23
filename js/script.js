jQuery(document).ready(function($) {
    (function() {
        var alphabet_normal_order = ['A','B','C','D','E','F','G','H',
                                     'I','J','K','L', 'M','N','O','P',
                                     'Q','R','S','T','U','V','W','X',
                                     'Y','Z'];
        var position = 0;
        var num_timer_loops = 0;
        var current_alphabet = alphabet_normal_order;
        var milliseconds_per_change = 200;
        $letter = $('#letter');
        $current_word = $('#current_word'),
        self = this;

        this.nextLetter = function() {
            position = (position + 1) % current_alphabet.length;
            $letter.text(current_alphabet[position]);
        };

        this.resetLetter = function() {
            position = 0;
            num_timer_loops = 0;
            $letter.text(current_alphabet[position]);
        };

        this.timer = function() {
            setTimeout(function() {
                if( (num_timer_loops + 1) % milliseconds_per_change == 0) {
                    self.nextLetter();
                }
                num_timer_loops++;
                self.timer();
            }, 1)
        };

        this.addLetter = function() {
            $current_word.text($current_word.text() + $letter.text());
        };

        this.timer();

        $letter.click(function() {
            self.addLetter();
            self.resetLetter();
            return false;
        });
    })();

});