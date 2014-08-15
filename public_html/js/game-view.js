/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #game.
 * @type type
 */
var gameView = {
    colors: null,
    values: null,
    // Constants
    FADE_LENGTH: 150,
    init: function() {
        gameView.colors = [];

        gameView.colors.push('color1');
        gameView.colors.push('color2');
        gameView.colors.push('color3');
        gameView.colors.push('color4');
        gameView.colors.push('color5');
        gameView.colors.push('color6');
        gameView.colors.push('color7');
        gameView.colors.push('color8');

        gameView.values = [];

        gameView.values.push('one');
        gameView.values.push('two');
        gameView.values.push('three');
        gameView.values.push('four');
        gameView.values.push('five');
        gameView.values.push('six');
        gameView.values.push('seven');
        gameView.values.push('eight');

        gameView.showButtonStartGame();
        gameView.clearTiles();
    },
    /**
     * Removes all tiles.
     */
    clearTiles: function() {
        $('#tile-container .tile').remove();
    },
    /**
     * Hides the start game button.
     */
    hideButtonStartGame: function() {
        $('#button-start-game').fadeOut(gameView.FADE_LENGTH);
    },
    /**
     * Hides all message overlays.
     */
    hideMessageOverlays: function() {
        $('.message-overlay').stop(true).hide();
    },
    /**
     * Hides all tiles.
     */
    hideTiles: function() {
        $('#tile-container').fadeOut(gameView.FADE_LENGTH);
    },
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} tiles
     */
    loadTiles: function(gridSize, tiles) {
        var html, i, j, width, tile, color, value, textSize;

        containerWidth = $(window).width();

        $('#tile-container').hide();

        width = containerWidth / gridSize - 2;
        textSize = (width / 1.5);

        html = $('#tile-template').html();

        for (i = 0; i < gridSize * gridSize; i += gridSize) {
            for (j = 0; j < gridSize; j++) {
                value = tiles[i + j].getValue();
                color = tiles[i + j].getColor();

                tile = $(html).width(width).height(width).css('font-size', textSize + 'px').css('line-height', width + 'px').data('index', i + j).addClass(gameView.colors[color - 1]);

                $(tile).text(value);

                $(tile).appendTo('#tile-container');
            }
        }

        $('#tile-container').height(containerWidth + 'px').fadeIn(gameView.FADE_LENGTH, function() {
            // Re-register event hookups.
            eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.game.tile', 'tap');
        });
    },
    /**
     * Display the number of chances that are left.
     * @param {type} chances
     */
    setChances: function(chances) {
        $('#game-chances').html('Chances:<br/>' + chances);
    },
    /**
     * Display the score. 
     * @param {type} score
     */
    setScore: function(score) {
        $('#game-score').html('Score:<br/>' + score);
    },
    /**
     * Shows the start game button.
     */
    showButtonStartGame: function() {
        $('#button-start-game').fadeIn(gameView.FADE_LENGTH);
    },
    /**
     * Display the tile that has to be tapped.
     * @param {type} value
     * @param {type} color
     * @param {type} timeout
     */
    showMatchTile: function(value, color, timeout) {
        // Don't do anything if we're supposed to be stopping.
        if (gamePresenter.getStopped()) {
            return;
        }

        // Set match tile's text and color. 
        $('#match-tile .content').removeClass(function(index, css) {
            return (css.match(/\bcolor\S+/g) || []).join(' ');
        }).text(gameView.values[value - 1]).addClass(gameView.colors[color - 1]).parent().fadeIn(gameView.FADE_LENGTH);

        setTimeout(function() {
            $('#match-tile').fadeOut(gameView.FADE_LENGTH);
        }, timeout);
    },
    /**
     * Mark the selected tile.
     * @param {type} tile
     */
    showSelectedTile: function(tile) {
        $('.tile').removeClass('popout');
        $(tile).addClass('popout');
    },
    /**
     * Show the result
     * @param {type} result
     * @param {type} timeout
     */
    showTapResult: function(result, timeout) {
        var text, color;

        // Don't do anything if we're supposed to be stopping.
        if (gamePresenter.getStopped()) {
            return;
        }

        if (result) {
            text = 'match';
            color = 'color4';
        }
        else {
            text = 'fail';
            color = 'color3';
        }

        $('#message .content').addClass(color).text(text).parent().fadeIn(gameView.FADE_LENGTH);

        setTimeout(function() {
            $('#message').fadeOut(gameView.FADE_LENGTH, function() {
                $(this).children('.content').removeClass('color3 color4');
            });
        }, timeout);
    }
};