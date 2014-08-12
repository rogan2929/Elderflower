/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #game-over
 * @type type
 */
var gameOverView = {
    /**
     * Set the displayed score.
     * @param {type} score
     */
    setScoreResult: function(score) {
        $('#score-result').text('Score: ' + score);
    }
};