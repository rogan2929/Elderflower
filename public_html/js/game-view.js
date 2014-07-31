/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gameView = {
    init: function() {

    },
    clearTiles: function() {
        $('#tile-container .tile').remove();
    },
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} tiles
     */
    loadTiles: function(gridSize, tiles) {
        var html, i, j, width, tile, color, value, margin, textSize, containerSize;

        containerWidth = $(window).width();

        $('#tile-container').fadeOut(constants.ANIMATION_LENGTH / 2, function() {
            width = containerWidth / gridSize - 10;
            textSize = (width / 3);

            html = $('#tile-template').html();

            for (i = 0; i < gridSize * gridSize; i += gridSize) {
                for (j = 0; j < gridSize; j++) {
                    value = tiles[i + j].getValue();
                    color = tiles[i + j].getColor();

                    tile = $(html).width(width).height(width).css('font-size', textSize + 'px').css('line-height', width + 'px').addClass(gameView.colors[color - 1]);

                    $(tile).text(value);

                    $(tile).appendTo('#tile-container');
                }
            }

            $('#tile-container').height(containerWidth + 'px').fadeIn(constants.ANIMATION_LENGTH / 2, function() {
                // Re-register event hookups.
                eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
                eventBus.installHandler('gamePresenter.onTapHoldTile', gamePresenter.onTapHoldTile, '.tile', 'taphold');
            });
        });
    }
};