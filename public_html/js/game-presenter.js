/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gamePresenter = {
    // Constants
    MIN_TILE_SIZE: 1,
    MAX_TILE_SIZE: 8,
    GRID_LENGTH: 6,
    MAX_CHANCES: 8,
    LOOP_TICK: 2000,
    HINT_LENGTH: 500,
    RESULT_TIMEOUT: 2000,
    
    // Variables
    tiles: null,
    newGame: true,
    score: 0,
    combo: 1,
    chances: 0,
    matchTile: null,
    selectedTile: null,
    stopCondition: false,
    /**
     * Entry point.
     */
    init: function() {
        if (gamePresenter.newGame) {
            gamePresenter.score = 0;
            gamePresenter.chances = gamePresenter.MAX_CHANCES;
        }
        
        gameView.init();

        // Event Handling
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
            
        // Start the game loop. 
        gamePresenter.resetLoop();
    },
    /**
    * Evaluate the given tile to see if is the match tile.
    * @param {type} tile
    * @returns {type}
    */
    evaluate: function(tile) {
        return true;
    },
    /**
     * Finish the game. 
     */
    finishGame: function() {
        alert(gamePresenter.score);
        
        // Navigate to game over page.
        // TODO
    },
    /**
    * Increment the score. 
    */
    incrementScore: function() {
        gamePresenter.score += (1000 * gamePresenter.combo);
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
        var value, color, match;
        
        match = gamePresenter.evaluate(gamePresenter.selectedTile);

        if (match) {
            // Correct tile was tapped. 
            gamePresenter.incrementScore();
        }
        else {
            // Incorrect selection. 
            gamePresenter.chances -= 1;
        
            if (gamePresenter.chances === 0) {
                // Game over. No chances left. 
                gamePresenter.finishGame();
                return;
            }   
        }
        
        // Show the tap result.
        gameView.showTapResult(match, gamePresenter.RESULT_TIMEOUT);
        gameView.setScore(gamePresenter.score);
        gameView.setChances(gamePresenter.chances);
        gameView.clearTiles();
        
        if (!gamePresenter.stopCondition) {            
            setTimeout(function() {
                gamePresenter.loadTiles();
            
                gamePresenter.matchTile = gamePresenter.selectMatchTile();
        
                value = gamePresenter.matchTile.getValue();
                color = gamePresenter.matchTile.getColor();
        
                gameView.showMatchTile(value, color, gamePresenter.HINT_LENGTH);
            
                // Start next iteration. 
                setTimeout(gamePresenter.loop, gamePresenter.LOOP_TICK);
            }, gamePresenter.RESULT_TIMEOUT + 500);
        }
    },
    /**
     * Reset the game loop.
     */
    resetLoop: function() {
        
        var value, color;
        
        gamePresenter.loadTiles();
        gameView.setScore(gamePresenter.score);
        gameView.setChances(gamePresenter.chances);
        
        gamePresenter.matchTile = gamePresenter.selectMatchTile();
        
        value = gamePresenter.matchTile.getValue();
        color = gamePresenter.matchTile.getColor();
        
        gameView.showMatchTile(value, color, gamePresenter.HINT_LENGTH);
        
        // Start the first iteration.
        setTimeout(gamePresenter.loop, gamePresenter.LOOP_TICK);
    },
    /**
    * Choose the match tile.
    * @returns {Tile}
    */
    selectMatchTile: function() {
        return gamePresenter.tiles[Math.floor(Math.random() * gamePresenter.tiles.length)];
    },
    /**
     * onTapTile
     */
    onTapTile: function(e) {
        // Mark the given tile as selected. 
        
        var index;
        
        index = $(e.currentTarget).data('index');
    }
};