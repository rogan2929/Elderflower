/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #leaderboard.
 * @type type
 */
var leaderboardView = {
    /**
     * Hides the Google+ Sign in button and login notice.
     */
    hideSigninNotice: function() {
        $('#signin-notice').fadeOut()
        $('#leaderboard .google-signin').fadeOut();
    }
};