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
        gamePresenter.setNewGame(true);
        model.clearGame();
        gameOverView.setScoreResult(gamePresenter.getScore());
    }
};