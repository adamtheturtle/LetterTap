/*global $ */
/*jslint browser: true*/
$('#writing-page').bind('pageinit', function () {
        // Constants
    var ALPHABET_NORMAL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                                 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                                 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

        ALPHABET_BY_FREQUENCY = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R',
                                 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y',
                                 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'],
        MAX_FONT_FOR_LETTER = 500,
        MAX_FONT_FOR_WORD = 100,
        MAX_SECONDS_PER_CHANGE = 8,
        // Initialised variables
        currentAlphabet = ALPHABET_NORMAL_ORDER,
        firstLetterAfterReset = false,
        speedScale = 3,
        position = 0,
        // DOM objects
        alphabetForm = $('#alphabet-form'),
        bottomSection = $('#bottom-section'),
        clearButton = $('#clear-button'),
        currentWord = $('#current-word'),
        currentWordContainer = $('#current-word-container'),
        letter = $('#letter'),
        letterContainer = $('#letter-container'),
        settingsPage = $('#settings-page'),
        // Functions
        addLetter,
        clearWord,
        changeAlphabet,
        letterChangeTimer,
        resetLetter,
        resizeTexts,
        textFill,
        waitForReady;

    resetLetter = function () {
        position = 0;
        letter.text(currentAlphabet[position]);
        firstLetterAfterReset = true;
    };

    letterChangeTimer = function () {
        var speedSlider = $('#speed-slider'),
            step = firstLetterAfterReset ? 0 : 1;

        position = (position + step) % currentAlphabet.length;
        letter.text(currentAlphabet[position]);
        firstLetterAfterReset = false;
        speedScale = speedSlider ? speedSlider.val() : speedScale;
        setTimeout(letterChangeTimer, MAX_SECONDS_PER_CHANGE * 1000 / speedScale);
    };

    clearWord = function () {
        currentWord.text('');
        resetLetter();
        clearButton.addClass('ui-disabled');
    };

    changeAlphabet = function () {
        currentAlphabet = $('#alphabet-form :radio:checked').val() === 'normal' ?
                ALPHABET_NORMAL_ORDER : ALPHABET_BY_FREQUENCY;
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
        return fontSize;
    };

    // Hack because pageinit is very early, before letterContainer height is ready
    waitForReady = function () {
        if (letterContainer.height() === 65) {
            setTimeout(waitForReady, 5);
        } else {
            resizeTexts();
        }
    };

    resizeTexts = function () {
        textFill(letterContainer, letter, MAX_FONT_FOR_LETTER);
        textFill(bottomSection, currentWord, MAX_FONT_FOR_WORD);
    };

    addLetter = function () {
        currentWord.text(currentWord.text() + letter.text());
        clearButton.removeClass('ui-disabled');
        resizeTexts();
        resetLetter();
    };

    letterChangeTimer();
    clearWord();
    waitForReady();

    $(document).bind('touchmove', false);
    $(document).ready(resizeTexts);
    $(window).resize(resizeTexts);
    alphabetForm.bind('change', changeAlphabet);
    clearButton.bind('click', clearWord);
    letterContainer.bind('click', addLetter);
    settingsPage.bind('pagehide', resetLetter);
});
