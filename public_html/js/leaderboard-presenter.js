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
            leaderboardView.hideSigninNotice();
            leaderboardView.showLeaderboardData(gameServices.getLeaderboardData());
        }
    }
};