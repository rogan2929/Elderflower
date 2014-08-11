/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var LoopTicks = {
    0: 3500, // slow
    1: 2750, // regular
    2: 2250         // fast
};

var gamePresenter = {
    // Constants
    MIN_TILE_SIZE: 1,
    MAX_TILE_SIZE: 8,
    GRID_LENGTH: 6,
    MAX_CHANCES: 8,
    LOOP_TICK: 2250,
    HINT_LENGTH: 750,
    RESULT_TIMEOUT: 2000,
    SCORE_INCREMENT: 50,
    // Variables
    tiles: null,
    newGame: true,
    score: 0,
    combo: 1,
    chances: 0,
    matchTile: null,
    selectedTile: null,
    loopTimeout: null,
    loopTick: null,
    /**
     * Entry point.
     */
    init: function() {
        var gameData, speed;

        // Load game data and speed.
        gameData = model.loadGame();
        speed = model.loadGameSpeed();

        // Resume the game if there is one.
        if (gameData) {
            gamePresenter.setNewGame(false);
            gamePresenter.setGameData(gameData);
        }

        // Attempt to set the game speed.
        if (speed) {
            gamePresenter.setGameSpeed(speed);
        }
        else {
            gamePresenter.setGameSpeed(1);      // Assume normal speed.
        }

        if (gamePresenter.newGame) {
            gamePresenter.score = 0;
            gamePresenter.chances = gamePresenter.MAX_CHANCES;
            gamePresenter.combo = 1;
        }

        gameView.init();

        gameView.setScore(gamePresenter.score);
        gameView.setChances(gamePresenter.chances);

        // Event Handling
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.game.tile', 'tap');
        eventBus.installHandler('gamePresenter.onTapButtonStartGame', gamePresenter.onTapButtonStartGame, '#button-start-game', 'tap');
    },
    /**
     * Evaluate the given tile to see if is the match tile.
     * @param {type} tile
     * @returns {type}
     */
    evaluate: function(tile) {
        var result;

        if (!tile) {
            result = false;
        }
        else {
            result = gamePresenter.matchTile.equals(tile);
        }

        return result;
    },
    /**
     * Finish the game. 
     */
    finishGame: function() {
        // Navigate to game over page.
        // TODO
        alert('Game over!');
    },
    /**
     * Increment the score. 
     */
    incrementScore: function() {
        gamePresenter.score += (gamePresenter.SCORE_INCREMENT * gamePresenter.combo);
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

            // Increment the multiplier...
            if (gamePresenter.combo < 10) {
                gamePresenter.combo += 1;
            }

            // Every ten in a row, give one up
            if (gamePresenter.combo % 10 === 0) {
                gamePresenter.chances += 1;
            }
        }
        else {
            // Incorrect selection. 
            gamePresenter.chances -= 1;

            gamePresenter.combo = 1;

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
        gameView.hideTiles();

        setTimeout(function() {
            gamePresenter.loadTiles();

            gamePresenter.selectedTile = null;

            gamePresenter.matchTile = gamePresenter.selectMatchTile();

            value = gamePresenter.matchTile.getValue();
            color = gamePresenter.matchTile.getColor();

            gameView.showMatchTile(value, color, gamePresenter.HINT_LENGTH);

            // Start next iteration. 
            gamePresenter.loopTimeout = setTimeout(gamePresenter.loop, gamePresenter.loopTick);
        }, gamePresenter.RESULT_TIMEOUT + 300);
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
        gamePresenter.loopTimeout = setTimeout(gamePresenter.loop, gamePresenter.loopTick);
    },
    /**
     * Choose the match tile.
     * @returns {Tile}
     */
    selectMatchTile: function() {
        return gamePresenter.tiles[Math.floor(Math.random() * gamePresenter.tiles.length)];
    },
    /**
     * Saves the game state.
     */
    saveGameData: function() {
        model.saveGame(new GameData(gamePresenter.score, gamePresenter.chances, gamePresenter.combo));
    },
    /**
     * Set game data.
     * @param {GameData} gameData
     */
    setGameData: function(gameData) {
        gamePresenter.score = gameData.score;
        gamePresenter.chances = gameData.chances;
        gamePresenter.combo = gameData.combo;
    },
    /**
     * Set the game speed.
     * @param {type} speed
     */
    setGameSpeed: function(speed) {
        // Retrieve loop duration based on speed index.
        gamePresenter.loopTick = LoopTicks[speed];
    },
    /**
     * Setter for newGame
     * @param {type} newGame
     */
    setNewGame: function(newGame) {
        gamePresenter.newGame = newGame;
    },
    /**
     * Stops the main game loop. 
     */
    stopLoop: function() {
        if (gamePresenter.loopTimeout) {
            clearTimeout(gamePresenter.loopTimeout);
            gamePresenter.loopTimeout = null;
        }
    },
    /**
     * onTapButtonStartGame
     * @param {type} e
     */
    onTapButtonStartGame: function(e) {
        gameView.hideButtonStartGame();

        setTimeout(function() {
            // Start the game loop. 
            gamePresenter.resetLoop();
        }, gamePresenter.HINT_LENGTH);
    },
    /**
     * onTapTile
     * @param {type} e
     */
    onTapTile: function(e) {
        var index;

        // Mark the given tile as selected. 
        index = $(e.currentTarget).data('index');
        gamePresenter.selectedTile = gamePresenter.tiles[index];
        gameView.showSelectedTile(e.currentTarget);
    }
};