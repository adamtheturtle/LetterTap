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
    var letter = $('#letter');
    var letter_container = $('#letter_container');
    var current_word = $('#current_word');
    var clear_button = $('#clear_button');
    var speed_slider = $('#speed_slider');
    var alphabet_form = $('#alphabet_form');
    var settings_page = $('#settings_page');
    var time_between_changes = 2600;

    resetLetter = function() {
        position = 0;
        letter.text(current_alphabet[position]);
    };

    timer = function() {
        setTimeout(function() {
            position = (position + 1) % current_alphabet.length;
            letter.text(current_alphabet[position]);
            timer();
        }, time_between_changes)
    };

    addLetter = function() {
        current_word.text(current_word.text() + letter.text());
        clear_button.show();
    };

    clearWord = function() {
        current_word.text('');
        resetLetter();
        clear_button.hide();
    };

    changeAlphabet = function(selected_alphabet) {
        if (selected_alphabet === 'normal') {
            current_alphabet = alphabet_normal_order;
        } else if (selected_alphabet === 'frequency') {
            current_alphabet = alphabet_by_frequency;
        }

        resetLetter();
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

    settings_page.on("pageshow", function() {
        var normal_alphabet_radio = $('#normal-alphabet')
        var frequency_alphabet_radio = $('#frequency-alphabet')

        if (current_alphabet === alphabet_normal_order) {
            normal_alphabet_radio.attr("checked", true).checkboxradio("refresh");
            frequency_alphabet_radio.attr("checked", false).checkboxradio("refresh");
        } else if (current_alphabet === alphabet_by_frequency) {
            normal_alphabet_radio.attr("checked", false).checkboxradio("refresh");
            frequency_alphabet_radio.attr("checked", true).checkboxradio("refresh");
        }

    });

    letter_container.click(function() {
        addLetter();
        resetLetter();
    });

    alphabet_form.change(function() {
        var selected_alphabet = $("#alphabet_form :radio:checked").val();
        changeAlphabet(selected_alphabet);
    });

    clear_button.click(function() {
        clearWord();
    });

});
