/*global $ */
/*jslint browser: true*/
$('#writing-page').bind('pageinit', function () {
    var ALPHABET_NORMAL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                                 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                                 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

        ALPHABET_BY_FREQUENCY = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R',
                                 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y',
                                 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'],
        position = 0,
        currentAlphabet = ALPHABET_NORMAL_ORDER,
        MAX_SECONDS_PER_CHANGE = 8,
        letter = $('#letter'),
        letterContainer = $('#letter-container'),
        currentWord = $('#current-word'),
        currentWordContainer = $('#current-word-container'),
        bottomSection = $('#bottom-section'),
        clearButton = $('#clear-button'),
        alphabetForm = $('#alphabet-form'),
        settingsPage = $('#settings-page'),
        firstLetterAfterReset = false,
        maxFont_FOR_LETTER = 500,
        speedScale = 3,
        maxFont_FOR_WORD = 100,
        resetLetter,
        letterChangeTimer,
        clearWord,
        changeAlphabet,
        textFill,
        waitForReady;

    resetLetter = function () {
        position = 0;
        letter.text(currentAlphabet[position]);
        firstLetterAfterReset = true;
    };

    letterChangeTimer = function () {
        var timeBetweenChanges = MAX_SECONDS_PER_CHANGE * 1000 / speedScale;
        if (!firstLetterAfterReset) {
            position = (position + 1) % currentAlphabet.length;
            letter.text(currentAlphabet[position]);
        }

        firstLetterAfterReset = false;
        setTimeout(letterChangeTimer, timeBetweenChanges);
    };

    clearWord = function () {
        currentWord.text('');
        resetLetter();
        clearButton.addClass('ui-disabled');
    };

    changeAlphabet = function (selectedAlphabet) {
        if (selectedAlphabet === 'normal') {
            currentAlphabet = ALPHABET_NORMAL_ORDER;
        } else if (selectedAlphabet === 'frequency') {
            currentAlphabet = ALPHABET_BY_FREQUENCY;
        }

        resetLetter();
    };

    textFill = function (container, resizableText, maxFont) {
        var fontSize = maxFont,
            maxHeight = container.height(),
            step = Math.ceil(maxFont / 100);

        do {
            resizableText.css('font-size', fontSize);
            if (resizableText === currentWord) {
                currentWordContainer.css('line-height', fontSize  + 'px');
            }

            fontSize = fontSize - step;
        } while ((resizableText.height() > maxHeight) && fontSize > step);
    };

    // Hack because pageinit is very early, before letterContainer height is ready
    waitForReady = function () {
        if (letterContainer.height() === 65) {
            setTimeout(waitForReady, 5);
        } else {
            textFill(letterContainer, letter, maxFont_FOR_LETTER);
        }
    };

    letterChangeTimer();
    clearWord();
    waitForReady();

    settingsPage.bind('pageinit', function () {
        var speedSlider = $('#speed-slider');
        speedSlider.change(function () {
            speedScale = $(this).val();
        });
    });

    settingsPage.bind("pagehide", function () {
        resetLetter();
    });

    letterContainer.click(function () {
        currentWord.text(currentWord.text() + letter.text());
        clearButton.removeClass('ui-disabled');
        textFill(bottomSection, currentWord, maxFont_FOR_WORD);
        resetLetter();
    });

    $(window).resize(function () {
        textFill(letterContainer, letter, maxFont_FOR_LETTER);
        textFill(bottomSection, currentWord, maxFont_FOR_WORD);
    });

    $(document).bind('touchmove', false);

    alphabetForm.change(function () {
        var selectedAlphabet = $("#alphabet-form :radio:checked").val();
        changeAlphabet(selectedAlphabet);
    });

    clearButton.click(function () {
        clearWord();
    });
});
