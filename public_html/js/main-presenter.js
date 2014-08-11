/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mainPresenter = {
    /**
    * Entry point
    */
    init: function() {
        // Load previous game, if it exists.
        
        eventBus.installHandler('mainPresenter.onTapBtnNew', mainPresenter.onTapBtnNew, '#btn-new', 'tap');
        eventBus.installHandler('mainPresenter.onTapBtnResume', mainPresenter.onTapBtnResume, '#btn-resume', 'tap');
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
    }
};