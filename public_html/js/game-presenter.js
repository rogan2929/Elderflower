/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * LoopTicks enum.
 * @type type
 */
var LoopTicks = {
    0: 4500,     // very slow
    1: 3500,     // slow
    2: 2750,     // regular
    3: 2250      // fast
};

/**
 * Presenter for #game
 * @type type
 */
var gamePresenter = {
    // Constants
    MIN_TILE_SIZE: 1,
    MAX_TILE_SIZE: 8,
    GRID_LENGTH: 6,
    MAX_CHANCES: 5,
    MAX_MULTIPLIER: 5,
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
            gamePresenter.setGameSpeed(2);      // Assume normal speed.
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
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.game.tile', 'touchstart');    // Bind to touchstart, since tap has a 300ms delay. 
        eventBus.installHandler('gamePresenter.onTapButtonStartGame', gamePresenter.onTapButtonStartGame, '#button-start-game', 'tap');
        
        // Play a neat sound effect.
        soundManager.playSound('woosh');
    },
    /**
     * Getter for score.
     * @returns {gameData.score|Number}
     */
    getScore: function() {
        return gamePresenter.score;
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
        // Set new game 
        navigation.navigateTo('game-over');
    },
    /**
     * Increment the score. 
     */
    incrementScore: function() {
        var multiplier;
        
        // Factor a bonus for combo and game speed. 
        multiplier = Math.min(gamePresenter.combo, gamePresenter.MAX_MULTIPLIER);
        multiplier = multiplier * LoopTicks[0] / gamePresenter.loopTick;
        
        gamePresenter.score += Math.floor(gamePresenter.SCORE_INCREMENT * multiplier);
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
        var value, color, match, sound;

        match = gamePresenter.evaluate(gamePresenter.selectedTile);

        if (match) {
            // Correct tile was tapped.
            gamePresenter.incrementScore();

            // Increment the multiplier...
            gamePresenter.combo += 1;

            // Every ten in a row, give one up
            if (gamePresenter.combo % 10 === 0) {
                gamePresenter.chances = Math.min(gamePresenter.chances + 1, gamePresenter.MAX_CHANCES);
            }
            
            sound = 'success';
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
            
            sound = 'fail';
        }

        // Show the tap result.
        gameView.showTapResult(match, gamePresenter.RESULT_TIMEOUT);
        soundManager.playSound(sound, 0.3);
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
            soundManager.playSound('woosh', 0.3);

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
        soundManager.playSound('woosh', 0.3);

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
        
        // Play a pop sound.
        soundManager.playSound('pop', 1.0);
    }
};