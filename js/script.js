/*global $ */
/*jslint browser: true*/
var writingPage = $('#writing-page');

writingPage.bind('pageinit', function () {
    "use strict";
        // Constants
    var ALPHABET_NORMAL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                                 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                                 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        ALPHABET_BY_FREQUENCY = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R',
                                 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y',
                                 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'],
        ALPHABET_YES_NO = ['YES', 'NO'],
        MAX_FONT = 500,
        MAX_SECONDS_PER_CHANGE = 16,
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
         * Takes a container and text to fit in it, and makes the text
         * as big as will possibly fit. Smaller the maximum font, the
         * faster this runs.
         */
        textFill = function (container, resizableText) {
            var fontSize = MAX_FONT,
                maxHeight = container.height(),
                maxWidth = container.width() * 0.9,
                step;

            do {
                step = Math.ceil(fontSize / 100);
                resizableText.css('font-size', fontSize);
                fontSize = fontSize - step;
            } while (resizableText.height() > maxHeight || resizableText.width() > maxWidth);
            resizableText.show();
        },

        /**
         * Calls textFill with letter's text and text
         * of the current word. Makes the current word container as large as possible.
         */
        resizeTexts = function () {
            textFill(letterContainer, letter);
            textFill(carerSection, currentWord);
            currentWordContainer.width((carerSection.width() * 0.9) - carerButtonContainer.width());
        },

        /**
         * Resets the letter to the beginning of the alphabet.
         */
        resetLetter = function () {
            var isSettingsOpen = settingsPage.is(":visible");
            letter.hide();
            position = 0;
            letter.text(currentAlphabet[position]);
            firstLetterAfterReset = true;
            if (!isSettingsOpen) {
                resizeTexts();
            }
        },

        /**
         * After a specified time, the letter will move
         * on one position in the alphabet. This is doubled
         * if the letter is the first letter after reset.
         */
        letterChange = function () {
            var speedSlider = $('#speed-slider'),
                isSettingsOpen = settingsPage.is(":visible");

            if (!firstLetterAfterReset) {
                position = (position + 1) % currentAlphabet.length;
                if (isSettingsOpen) {
                    position = 0;
                }

                letter.text(currentAlphabet[position]);
                resizeTexts();
            }

            firstLetterAfterReset = false;

            // If the speed slider can be found, use its value
            speedScale = speedSlider ? speedSlider.val() : speedScale;
            setTimeout(letterChange, MAX_SECONDS_PER_CHANGE * 1000 / speedScale);
        },
        /**
         * Clears the current word, making the Clear
         * button disabled and resetting the letter.
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

            switch (currentAlphabetName) {
            case 'normal':
                currentAlphabet = ALPHABET_NORMAL_ORDER;
                break;
            case 'frequency':
                currentAlphabet = ALPHABET_BY_FREQUENCY;
                break;
            case 'yes/no':
                currentAlphabet = ALPHABET_YES_NO;
                break;
            }

            resetLetter();
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

    letterChange();
    clearWord();

    // No scrolling on mobile
    $(document).on('touchmove', false);
    // The element sizes are not ready until $(document).ready() for resize
    $(document).ready(resizeTexts);
    $(window).on('resize', resizeTexts);
    alphabetForm.on('change', changeAlphabet);
    currentWordContainer.on('click', addLetter);
    clearButton.on('click', clearWord);
    letterContainer.on('click', addLetter);
    settingsPage.on('pagehide', resetLetter);
    // Any key on a keyboard adds a letter
    writingPage.keyup(addLetter);
});
