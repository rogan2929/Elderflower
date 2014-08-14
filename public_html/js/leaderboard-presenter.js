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
        if (gameServices.getAuthenticated()) {
            leaderboardView.showLeaderboardData(gameServices.getLeaderboardData());
        }
        else {
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
            leaderboardView.showLeaderboardData(gameServices.getLeaderboardData());
        }, function(error) {
            alert('Google+ sign in failed: ' + error);
        });
    }
};