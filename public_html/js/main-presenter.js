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
                default:
                    // Sign into Google Game Services
                    mainPresenter.enableGameServices();
                    break;
            }
        }
        
        eventBus.installHandler('mainPresenter.onTapBtnFeedback', mainPresenter.onTapBtnFeedback, '#btn-feedback', 'tap');
        eventBus.installHandler('mainPresenter.onTapBtnNew', mainPresenter.onTapBtnNew, '#btn-new', 'tap');
        eventBus.installHandler('mainPresenter.onTapBtnResume', mainPresenter.onTapBtnResume, '#btn-resume', 'tap');
        eventBus.installHandler('mainPresenter.onTapBtnSignIn', mainPresenter.onTapBtnSignIn, '#btn-signin', 'tap');
    },
    enableGameServices: function() {
        gameServices.signIn(function() {
            model.setConnectionStatus(true);
            
            // Hide the sign in button. (Move to view.)
            $('#btn-signin').hide();
        }, function(error) {
            alert('Google+ sign in failed: ' + error);
        });
    },
    onTapBtnFeedback: function(e) {
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