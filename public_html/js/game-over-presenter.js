/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #game-over
 * @type type
 */
var gameOverPresenter = {
    /**
     * Entry point.
     */
    init: function() {
        var score;
        
        score = gamePresenter.getScore();
        
        // Clean up and then submit the score to the leaderboard.
        gamePresenter.setNewGame(true);
        model.clearGame();
        gameOverView.setScoreResult(score);
        gameServices.submitScore(score, function() {});
    }
};