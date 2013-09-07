$('#writing_page').bind('pageinit', function() {
    var alphabet_normal_order = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                                 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                                 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var alphabet_by_frequency = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R',
                                 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y',
                                 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'];
    var position = 0;
    var current_alphabet = alphabet_normal_order;
    var slowest_speed_seconds_per_change = 8;
    var time_between_changes = 2600;
    var normal_alphabet_radio = $('#normal-alphabet');
    var frequency_alphabet_radio = $('#frequency-alphabet');
    var letter = $('#letter');
    var letter_container = $('#letter_container');
    var current_word = $('#current_word');
    var current_word_container = $('#current_word_container');
    var bottom_section = $('#bottom_section');
    var clear_button = $('#clear_button');
    var alphabet_form = $('#alphabet_form');
    var settings_page = $('#settings_page');
    var first_letter_after_reset = false;

    resetLetter = function() {
        position = 0;
        letter.text(current_alphabet[position]);
        first_letter_after_reset = true;
    };

    timer = function() {
        setTimeout(function() {
            if (!first_letter_after_reset) {
                position = (position + 1) % current_alphabet.length;
                letter.text(current_alphabet[position]);
            }

            first_letter_after_reset = false;
            timer();
        }, time_between_changes)
    };

    clearWord = function() {
        current_word.text('');
        resetLetter();
        clear_button.addClass('ui-disabled');
    };

    changeAlphabet = function(selected_alphabet) {
        if (selected_alphabet === 'normal') {
            current_alphabet = alphabet_normal_order;
        } else if (selected_alphabet === 'frequency') {
            current_alphabet = alphabet_by_frequency;
        }

        resetLetter();
    };

    textfill = function(container, resizable_text) {
        var font_size = 2000;
        var max_height = container.height();
        var text_height;
        do {
            resizable_text.css('font-size', font_size);
            font_size = font_size - 10;
        } while ((resizable_text.height() > max_height) && font_size > 3);
    };

    timer();
    clearWord();
    $(document).bind('touchmove', false);

    settings_page.bind('pageinit', function() {
        var speed_slider = $('#speed_slider');
        speed_slider.change(function() {
            speed_scale = $(this).val();
            time_between_changes = slowest_speed_seconds_per_change * 1000 / speed_scale;
        });
    });

    settings_page.bind("pagehide",function(){
      resetLetter();
    });

    letter_container.click(function() {
        current_word.text(current_word.text() + letter.text());
        clear_button.removeClass('ui-disabled');
        textfill(bottom_section, current_word);
        resetLetter();
        
        current_word_container.css('line-height', (font_size + 1) + 'px');
    });
    
    $(window).resize(function() {
        textfill(letter_container, letter);
    });
    
    $(document).ready(function() {
        textfill(letter_container, letter);
    });

    alphabet_form.change(function() {
        var selected_alphabet = $("#alphabet_form :radio:checked").val();
        changeAlphabet(selected_alphabet);
    });

    clear_button.click(function() {
        clearWord();
    });
    

});
