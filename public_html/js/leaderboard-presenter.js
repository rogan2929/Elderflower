/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #leaderboard.
 * @type type
 */
var leaderboardPresenter = {
    /**
     * Entry point.
     */
    init: function() {
        // Check for valid connection to Game Services.
        if (gameServices.getAuthenticated()) {
            // Try to load the leaderboard.
            gameServices.getLeaderboardData(function(data) {
                leaderboardView.showLeaderboardData(data);
                leaderboardView.hideSigninNotice();
            }, 'ALL_TIME');
        }
        else {
            // Otherwise show the login notice and button.
            leaderboardView.showSigninNotice();
            eventBus.installHandler('leaderboardPresenter.onTapBtnSignIn', leaderboardPresenter.onTapBtnSignIn, '#leaderboard .google-signin', 'tap');
        }
    },
    onTapBtnSignIn: function(e) {
        // Sign into Google Game Services.
        gameServices.signIn(function() {
            // Allow auto login next time the app is launched.
            model.setConnectionStatus(true);

            // Hide the sign in button and load the leaderboard data.
            leaderboardView.hideSigninNotice();
            
            gameServices.getLeaderboardData(function(data) {
                leaderboardView.showLeaderboardData(data);
            }, 'ALL_TIME');
        }, function(error) {
            alert('Google+ sign in failed: ' + error);
        });
    }
};