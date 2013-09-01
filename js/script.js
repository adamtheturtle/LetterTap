jQuery(document).ready(function($) {
    (function() {
        var alphabet_normal_order = ['A','B','C','D','E','F','G','H',
                                     'I','J','K','L', 'M','N','O','P',
                                     'Q','R','S','T','U','V','W','X',
                                     'Y','Z'];

        var alphabet_by_frequency = ['E','T','A','O','I','N','S','H',
                                     'R','D','L','C','U','M','W','F',
                                     'G','Y','P','B','V','K','J','X',
                                     'Q','Z'];
        var position = 0;
        var num_timer_loops = 1;
        var current_alphabet = alphabet_normal_order;
        var slowest_speed_seconds_per_change = 8;
        var milliseconds_per_change;
        $letter = $('#letter');
        $letter_container = $('#letter_container');
        $current_word = $('#current_word');
        $clear_button = $('#clear_button');
        $speed_slider = $('#speed_slider');
        $alphabet_normal_radio = $('#alphabet_normal_radio');
        $alphabet_frequency_radio = $('#alphabet_frequency_radio');
        $alphabet_form = $('#alphabet_form');
        self = this;

        this.nextLetter = function() {
            position = (position + 1) % current_alphabet.length;
            $letter.text(current_alphabet[position]);
        };

        this.resetLetter = function() {
            position = 0;
            num_timer_loops = 1;
            $letter.text(current_alphabet[position]);
        };

        this.timer = function() {
            setTimeout(function() {
                if( num_timer_loops % milliseconds_per_change == 0) {
                    self.nextLetter();
                }
                num_timer_loops++;
                self.timer();
            }, 10)
        };

        this.addLetter = function() {
            $current_word.text($current_word.text() + $letter.text());
        };

        this.setSpeed = function() {
            slowest_speed = slowest_speed_seconds_per_change * 100;
            milliseconds_per_change = Math.round(slowest_speed / $speed_slider.val());
        };

        this.clearWord = function() {
            $current_word.text('');
            self.resetLetter();
        };

        this.changeAlphabet = function() {
            if($alphabet_normal_radio.is(':checked')) {
                current_alphabet = alphabet_normal_order;
            } else if($alphabet_frequency_radio.is(':checked')) {
                current_alphabet = alphabet_by_frequency;
            }

            self.resetLetter();
        };

        this.changeAlphabet();
        this.setSpeed();
        this.timer();

        $letter_container.click(function() {
            self.addLetter();
            self.resetLetter();
        });
        
        $speed_slider.change(function() {
            self.setSpeed();
        });
        
        $alphabet_form.change(function() {
            self.changeAlphabet();
        });

        $clear_button.click(function() {
            self.clearWord();
        });
    })();

});