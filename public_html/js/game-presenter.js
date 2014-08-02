/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gamePresenter = {
    // Constants
    MIN_TILE_SIZE: 1,
    MAX_TILE_SIZE: 8,
    GRID_LENGTH: 5,
    MAX_CHANCES: 3,
    LOOP_TICK: 2600,
    // Variables
    colors: null,
    tiles: null,
    loopInterval: null,
    newGame: true,
    score: 0,
    chances: 0,
    /**
     * Entry point.
     */
    init: function() {
        if (gamePresenter.newGame) {
            gameView.init();

            gameView.colors = [];

            gameView.colors.push('color1');
            gameView.colors.push('color2');
            gameView.colors.push('color3');
            gameView.colors.push('color4');
            gameView.colors.push('color5');
            gameView.colors.push('color6');
            gameView.colors.push('color7');
            gameView.colors.push('color8');

            gamePresenter.score = 0;
            
            gamePresenter.chances = gamePresenter.MAX_CHANCES; 
			gamePresenter.loadTiles();
        }

        // Event Handling
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');

        // Start the game loop.
        gamePresenter.resetLoop();
    },
    /**
     * Finish the game.
     * @param {type} victory
     */
    finishGame: function(victory) {
        // Stop the loop.
        gamePresenter.stopLoop();
        
        if (victory) {
            alert('victory!');
        }
        else {
            alert('loser!');
        }
    },
    /**
     * Load tiles.
     */
    loadTiles: function() {
        gamePresenter.tiles = tileFactory.generateTiles();

        // Populate the interface.
        gameView.clearTiles();
        gameView.loadTiles(gamePresenter.GRID_LENGTH, gamePresenter.tiles);
    },
    /**
     * The main game loop function.
     */
    loop: function() {
        // Main game loop is as follows.
        // 1. Show colored number, then hide it.
        // 2. Load tiles.
        // 3. Decrement chances if correct tile was not tapped.

        //gamePresenter.loadTiles();
        
        gamePresenter.chances--;
        
        console.log(gamePresenter.chances);
        
        if (gamePresenter.chances <= 0) {
            gamePresenter.finishGame(false);
        }
    },
    /**
     * Reset the game loop.
     */
    resetLoop: function() {
        if (gamePresenter.loopInterval) {
            clearInterval(gamePresenter.loopInterval);
            gamePresenter.loopInterval = null;
        }

        gamePresenter.loopInterval = setInterval(gamePresenter.loop, gamePresenter.LOOP_TICK);
    },
    /**
     * Stop the game loop.
     */
    stopLoop: function() {
        if (gamePresenter.loopInterval) {
            clearInterval(gamePresenter.loopInterval);
            gamePresenter.loopInterval = null;
        }
    },
    /**
     * onTapTile
     */
    onTapTile: function() {
        // Evaluate if correct tile was tapped.
        // If it was:
        // 1. Stop Timer.
        // 2. Increase score, taking into account how many correct in a row.
        // 3. Restart the loop.

        gamePresenter.stopLoop();
    }
};