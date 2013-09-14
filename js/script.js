/*global $ */
/*jslint browser: true*/
var writingPage = $('#writing-page');

writingPage.bind('pageinit', function () {
        // Constants
    var ALPHABET_NORMAL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                                 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                                 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

        ALPHABET_BY_FREQUENCY = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R',
                                 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y',
                                 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'],
        MAX_FONT = 500,
        MAX_SECONDS_PER_CHANGE = 8,
        // Initialised variables
        currentAlphabet = ALPHABET_NORMAL_ORDER,
        firstLetterAfterReset = false,
        speedScale = 3,
        position = 0,
        // DOM objects
        alphabetForm = $('#alphabet-form'),
        carerButtonContainer = $('#carer-button-container'),
        carerSection = $('#carer-section'),
        clearButton = $('#clear-button'),
        currentWord = $('#current-word'),
        currentWordContainer = $('#current-word-container'),
        letter = $('#letter'),
        letterContainer = $('#letter-container'),
        settingsPage = $('#settings-page'),
        // Functions
        /**
         * Resets the letter to the beginning of the alphabet.
         */
        resetLetter = function () {
            position = 0;
            letter.text(currentAlphabet[position]);
            firstLetterAfterReset = true;
        },

        /**
         * After a specified time, the letter will move
         * on one position in the alphabet. This is doubled
         * if the letter is the first letter after reset.
         */
        letterChangeTimer = function () {
            var speedSlider = $('#speed-slider'),
                step = firstLetterAfterReset ? 0 : 1;

            position = (position + step) % currentAlphabet.length;
            letter.text(currentAlphabet[position]);
            firstLetterAfterReset = false;
            speedScale = speedSlider ? speedSlider.val() : speedScale;
            setTimeout(letterChangeTimer, MAX_SECONDS_PER_CHANGE * 1000 / speedScale);
        },
        /**
         * Clears the current word, making the Clear
         * button disabled.
         */
        clearWord = function () {
            currentWord.text('');
            resetLetter();
            clearButton.addClass('ui-disabled');
        },

        /**
         * Changes alphabet based on which radio button is checked
         * from the alphabet form, and starts from the beginning.
         */
        changeAlphabet = function () {
            var currentAlphabetName = $('#alphabet-form :radio:checked').val();
            if (currentAlphabetName === 'normal') {
              currentAlphabet = ALPHABET_NORMAL_ORDER;
            } else if (currentAlphabetName === 'frequency') {
              currentAlphabet = ALPHABET_BY_FREQUENCY;
            }

            resetLetter();
        },

        /**
         * Takes a container and text to fit in it, and makes the text
         * as big as will possibly fit. Smaller the maximum font, the
         * faster this runs.
         */
        textFill = function (container, resizableText) {
            var fontSize = MAX_FONT,
                maxHeight = container.height(),
                step;

            do {
                step = Math.ceil(fontSize / 100);
                resizableText.css('font-size', fontSize);
                fontSize = fontSize - step;
            } while (resizableText.height() > maxHeight);
        },

        /**
         * Calls textFill with letter's text and text
         * of the current word. Makes the current word container as large as possible.
         */
        resizeTexts = function () {
            currentWordContainer.width((carerSection.width() * 0.9) - carerButtonContainer.width());
            textFill(letterContainer, letter);
            textFill(carerSection, currentWord);
        },

        /**
         * Adds the current letter to the current word
         */
        addLetter = function () {
            currentWord.text(currentWord.text() + letter.text());
            clearButton.removeClass('ui-disabled');
            resizeTexts();
            resetLetter();
        };

    letterChangeTimer();
    clearWord();

    $(document).on('touchmove', false);
    $(document).ready(resizeTexts);
    $(window).on('resize', resizeTexts);
    alphabetForm.on('change', changeAlphabet);
    currentWordContainer.on('click', addLetter);
    clearButton.on('click', clearWord);
    letterContainer.on('click', addLetter);
    settingsPage.on('pagehide', resetLetter);
    writingPage.keyup(addLetter);
});
