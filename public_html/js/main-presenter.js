/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #main
 * @type type
 */
var mainPresenter = {
    /**
     * Entry point
     */
    init: function() {
        if (window.device) {
            // Determine the platform, so user can be directed to either Google Play or App Store.
            switch (window.device.platform) {
                case 'Android':
                    // Sign into Google Game Services
                    mainPresenter.enableGameServices();
                    break;
                case 'iOS':
                    // Connect to Game Center
                    break;
            }
        }
        else {
            // Not sure of which platform, so just hide the login buttons and do nothing.
            mainView.hideGoogleSigninButton();
        }

        eventBus.installHandler('mainPresenter.onTapBtnFeedback', mainPresenter.onTapBtnFeedback, '#btn-feedback', 'tap');
        eventBus.installHandler('mainPresenter.onTapBtnNew', mainPresenter.onTapBtnNew, '#btn-new', 'tap');
        eventBus.installHandler('mainPresenter.onTapBtnResume', mainPresenter.onTapBtnResume, '#btn-resume', 'tap');
        eventBus.installHandler('mainPresenter.onTapBtnSignIn', mainPresenter.onTapBtnSignIn, '#btn-signin', 'tap');
    },
    enableGameServices: function() {
        gameServices.signIn(function() {
            model.setConnectionStatus(true);

            // Hide the sign in button.
            mainView.hideGoogleSigninButton();
        }, function(error) {
            alert('Google+ sign in failed: ' + error);
        });
    },
    onTapBtnFeedback: function(e) {
        if (window.device) {
            // Determine the platform, so user can be directed to either Google Play or App Store.
            switch (window.device.platform) {
                case 'Android':
                    window.open('https://play.google.com/store/apps/details?id=com.rogan2929.elderflower', '_blank', 'location=no,toolbar=no');
                    break;
                case 'iPhone':
                    break;
            }
        }
    },
    onTapBtnNew: function(e) {
        gamePresenter.setNewGame(true);
        model.clearGame();
    },
    onTapBtnResume: function(e) {
        var gameData;

        gameData = model.loadGame();

        // Resume the game if there is one.
        if (gameData) {
            gamePresenter.setNewGame(false);
            gamePresenter.setGameData(gameData);
        }
        else {
            gamePresenter.setNewGame(true);
            model.clearGame();
        }
    },
    onTapBtnSignIn: function(e) {

    }
};