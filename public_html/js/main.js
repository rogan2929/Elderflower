/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onerror = function(msg, url, linenumber) {
    alert('Error Message: ' + msg + '\nURL: ' + url + '\nLineNumber: ' + linenumber);
    return true;
};

/**
 * Create a basic Array.contains() function.
 * @param {type} obj
 * @returns {Boolean}
 */
Array.prototype.contains = function(obj) {
    var i, match;

    match = false;

    for (i = 0; i < this.length; i++) {
        // Check for equals() function.
        if (this[i].equals) {
            if (this[i].equals(obj)) {
                match = true;
            }
        }
        else {
            // Default to === operator.
            if (this[i] === obj) {
                match = true;
            }
        }
    }

    return match;
};

// Page load / hide events.

$(document).on('pagebeforeshow', '#game', function(e) {
    gamePresenter.init();
    soundManager.startMusic();
});

$(document).on('pagebeforehide', '#game', function(e) {
    // Pause the game and save it.
    gamePresenter.stopLoop();
    gameView.hideMessageOverlays();
    gamePresenter.saveGameData();
    soundManager.stopMusic();
});

$(document).on('pagebeforeshow', '#game-over', function(e) {
    gameOverPresenter.init();
});

$(document).on('pagebeforeshow', '#main', function(e) {
    mainPresenter.init();
});

$(document).on('pagebeforeshow', '#options', function(e) {
    optionsPresenter.init();
});

$(document).on('pagebeforehide', '#options', function(e) {
    // Save all options when navigating away from the options page.
    optionsPresenter.saveAllOptions();
});

$(document).on('pagebeforeshow', '#leaderboard', function(e) {
    leaderboardPresenter.init();
});