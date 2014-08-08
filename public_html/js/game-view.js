/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gameView = {
    colors: null,
    values: null,
    
    // Constants
    FADE_LENGTH: 250,
    
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
    },
    clearTiles: function() {
        $('#tile-container .tile').remove();
    },
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} tiles
     */
    loadTiles: function(gridSize, tiles, timeout) {
        var html, i, j, width, tile, color, value, textSize;

        containerWidth = $(window).width();

        $('#tile-container').fadeOut(gameView.FADE_LENGTH, function() {
            width = containerWidth / gridSize - 2;
            textSize = (width / 1.5);

            html = $('#tile-template').html();

            for (i = 0; i < gridSize * gridSize; i += gridSize) {
                for (j = 0; j < gridSize; j++) {
                    value = tiles[i + j].getValue();
                    color = tiles[i + j].getColor();

                    tile = $(html).width(width).height(width).css('font-size', textSize + 'px').css('line-height', width + 'px').data('index',  i + j).addClass(gameView.colors[color - 1]);

                    $(tile).text(value);

                    $(tile).appendTo('#tile-container');
                }
            }

            $('#tile-container').height(containerWidth + 'px').fadeIn(gameView.FADE_LENGTH, function() {
                // Re-register event hookups.
                eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
                eventBus.installHandler('gamePresenter.onTapHoldTile', gamePresenter.onTapHoldTile, '.tile', 'taphold');
            });
        });
    },
    /**
    * Display the number of chances that are left. 
    */
    setChances: function(chances) {
        $('#game-chances').text('Chances: ' + chances);
    },
    /**
    * Display the score. 
    */
    setScore: function(score) {
        $('#game-score').text('Score: ' + score);
    },
    /**
    * Display the tile that has to be tapped.
    * @param {type} value
    * @param {type} color
    * @param {type} timeout
    */
    showMatchTile: function(value, color, timeout) {
        // Set match tile's text and color. 
        $('#match-tile .content').removeClass(function (index, css) {
            return (css.match (/\bcolor\S+/g) || []).join(' ');
        }).text(gameView.values[value - 1]).addClass(gameView.colors[color - 1]).parent().fadeIn(gameView.FADE_LENGTH);
          
        setTimeout(function() {
            $('#match-tile').fadeOut(gameView.FADE_LENGTH);
        }, timeout);
    },
    /**
    * Show the result
    *
    */
    showTapResult: function(result, timeout) {
        var text;
        
        if (result) {
            text = 'Match!';
        }
        else {
            text = 'Try Again!';
        }
        
        $('#message .content').text(text).parent().fadeIn(gameView.FADE_LENGTH);
        
        setTimeout(function() {
            $('#message').fadeOut(gameView.FADE_LENGTH);
        }, timeout);
    }
};