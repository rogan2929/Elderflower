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
        if (gameServices.getConnectionStatus()()) {
            // Try to load the leaderboard.
            gameServices.getLeaderboardData(function(data) {
                // Success
                
                // Show leaderboard and hide sigin notice.
                leaderboardView.showLeaderboardData(data);
                leaderboardView.hideSigninNotice();
            }, function(error) {
                // Fail
                alert(error);
            }, 'ALL_TIME');
        }
        else {
            // Otherwise show the login notice and button.
            leaderboardView.showSigninNotice();
            eventBus.installHandler('leaderboardPresenter.onTapBtnSignIn', leaderboardPresenter.onTapBtnSignIn, '#leaderboard .google-signin', 'tap');
        }
    },
    onTapBtnSignIn: function(e) {      
        // Sign into Google Game Services and try to load the leaderboard.
        gameServices.getLeaderboardData(function(data) {
            // Success
            
            // Show leaderboard and hide sigin notice.
            leaderboardView.showLeaderboardData(data);
            leaderboardView.hideSigninNotice();
            
            // Allow auto login next time the app is launched.
            model.setConnectionStatus(true);
        }, function(error) {
            // Fail
            alert(error);
        }, 'ALL_TIME', true);
    }
};