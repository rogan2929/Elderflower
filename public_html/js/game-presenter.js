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
    0: 4500, // very slow
    1: 3500, // slow
    2: 2750, // regular
    3: 2250      // fast
};

/**
 * Presenter for #game
 * @type type
 */
var gamePresenter = {
    // Constants
    MAX_TILE_SIZE: 8,
    MAX_CHANCES: 3,
    MAX_MULTIPLIER: 5,
    HINT_LENGTH: 750,
    RESULT_TIMEOUT: 2000,
    SCORE_INCREMENT_BASE: 50,
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
    stopped: false,
    length: 0,
    /**
     * Entry point.
     */
    init: function() {
        var gameData, options;

        // Load game data and options.
        gameData = model.loadGame();
        options = model.loadOptions();
        
        // Set speed and side length
        gamePresenter.loopTick = LoopTicks[options.getSpeed()];
        gamePresenter.length = options.getLength();

        // Resume the game if there is one.
        if (gameData) {
            gamePresenter.setNewGame(false);
            gamePresenter.setGameData(gameData);
        }

        if (gamePresenter.newGame) {
            gamePresenter.score = 0;
            gamePresenter.chances = gamePresenter.MAX_CHANCES;
            gamePresenter.combo = 1;
        }

        gameView.init();

        gamePresenter.stopped = false;

        gameView.setScore(gamePresenter.score);
        gameView.setChances(gamePresenter.chances);

        // Event Handling
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.game.tile', 'touchstart');    // Bind to touchstart, since tap has a 300ms delay. 
        eventBus.installHandler('gamePresenter.onTapButtonStartGame', gamePresenter.onTapButtonStartGame, '#button-start-game', 'tap');

        // Play a neat sound effect.
        soundManager.playSound('woosh', 0.1);
    },
    /**
     * Getter for score.
     * @returns {gameData.score|Number}
     */
    getScore: function() {
        return gamePresenter.score;
    },
    /**
     * Getter for stopped.
     * @returns {Boolean}
     */
    getStopped: function() {
        return gamePresenter.stopped;
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

        // When considering how much to increment the score, take these into account:
        // 1. Current combo length
        // 2. Game speed
        // 3. Grid Size.
        multiplier = Math.min(gamePresenter.combo, gamePresenter.MAX_MULTIPLIER);
        multiplier = multiplier * LoopTicks[0] / gamePresenter.loopTick;
        gamePresenter.score += Math.floor(gamePresenter.SCORE_INCREMENT_BASE * multiplier + (multiplier * 3 * gamePresenter.length));
    },
    /**
     * Load tiles.
     */
    loadTiles: function() {
        gamePresenter.tiles = tileFactory.generateTiles(gamePresenter.length, gamePresenter.MAX_TILE_SIZE);

        // Populate the interface.
        gameView.clearTiles();
        gameView.loadTiles(gamePresenter.length, gamePresenter.tiles);
    },
    /**
     * The main game loop function.
     */
    loop: function() {
        var value, color, match, sound;

        match = gamePresenter.evaluate(gamePresenter.selectedTile);

        // Immediately halt the loop if we're supposed to be stopping.
        if (gamePresenter.stopped) {
            gamePresenter.stopLoop();
            return;
        }

        if (match) {
            // Correct tile was tapped.
            gamePresenter.incrementScore();

            // Increment the multiplier...
            gamePresenter.combo += 1;

            // Every ten in a row, give one up
            if (gamePresenter.combo % 10 === 0) {
                gamePresenter.chances = Math.min(gamePresenter.chances + 1, gamePresenter.MAX_CHANCES);
            }

            sound = {name: 'success', volume: 0.7};
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

            sound = {name: 'fail', volume: 0.4};
        }

        // Immediately halt the loop if we're supposed to be stopping.
        if (gamePresenter.stopped) {
            gamePresenter.stopLoop();
            return;
        }

        // Show the results and hide the tiles.
        gameView.showTapResult(match, gamePresenter.RESULT_TIMEOUT);
        soundManager.playSound(sound.name, sound.volume);
        gameView.setScore(gamePresenter.score);
        gameView.setChances(gamePresenter.chances);
        gameView.hideTiles();

        setTimeout(function() {
            gamePresenter.loadTiles();

            gamePresenter.selectedTile = null;

            gamePresenter.matchTile = gamePresenter.selectMatchTile();

            value = gamePresenter.matchTile.getValue();
            color = gamePresenter.matchTile.getColor();

            // Immediately halt the loop if we're supposed to be stopping.
            if (gamePresenter.stopped) {
                gamePresenter.stopLoop();
                return;
            }

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

        // Only start the loop if the game is not stopped.
        if (!gamePresenter.stopped) {
            gamePresenter.loadTiles();
            gameView.setScore(gamePresenter.score);
            gameView.setChances(gamePresenter.chances);

            gamePresenter.matchTile = gamePresenter.selectMatchTile();

            value = gamePresenter.matchTile.getValue();
            color = gamePresenter.matchTile.getColor();

            gameView.showMatchTile(value, color, gamePresenter.HINT_LENGTH);

            // Start the first iteration.
            gamePresenter.loopTimeout = setTimeout(gamePresenter.loop, gamePresenter.loopTick);
        }
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

        // Prevent a race condition where stopLoop() is called before resetLoop().
        gamePresenter.stopped = true;
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