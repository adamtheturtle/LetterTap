$(document).ready(function() {
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
    var letter = $('#letter');
    var letter_container = $('#letter_container');
    var current_word = $('#current_word');
    var clear_button = $('#clear_button');
    var speed_slider = $('#speed_slider');
    var alphabet_normal_radio = $('#alphabet_normal_radio');
    var alphabet_frequency_radio = $('#alphabet_frequency_radio');
    var alphabet_form = $('#alphabet_form');

    nextLetter = function() {
        position = (position + 1) % current_alphabet.length;
        letter.text(current_alphabet[position]);
    };

    resetLetter = function() {
        position = 0;
        num_timer_loops = 1;
        letter.text(current_alphabet[position]);
    };

    timer = function() {
        setTimeout(function() {
            if( num_timer_loops % milliseconds_per_change == 0) {
                nextLetter();
            }
            num_timer_loops++;
            timer();
        }, 10)
    };

    addLetter = function() {
        current_word.text(current_word.text() + letter.text());
    };

    setSpeed = function() {
        slowest_speed = slowest_speed_seconds_per_change * 100;
        milliseconds_per_change = Math.round(slowest_speed / speed_slider.val());
    };

    clearWord = function() {
        current_word.text('');
        resetLetter();
    };

    changeAlphabet = function() {
        if(alphabet_normal_radio.is(':checked')) {
            current_alphabet = alphabet_normal_order;
        } else if(alphabet_frequency_radio.is(':checked')) {
            current_alphabet = alphabet_by_frequency;
        }

        resetLetter();
    };

    changeAlphabet();
    setSpeed();
    timer();

    letter_container.click(function() {
        addLetter();
        resetLetter();
    });
    
    speed_slider.change(function() {
        setSpeed();
    });
    
    alphabet_form.change(function() {
        changeAlphabet();
    });

    clear_button.click(function() {
        clearWord();
    });
});