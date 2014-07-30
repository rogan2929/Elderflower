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
    // Variables
    colors: null,
    tiles: null,
    /**
     * Entry point.
     */
    init: function() {
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

        gamePresenter.generateTiles();
        
        gameView.clearTiles();
        
        gameView.loadTiles(gamePresenter.GRID_LENGTH, gamePresenter.tiles);
        
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
    },
    /**
     * Generate tile values and colors.
     */
    generateTiles: function() {
        var value, i, gridSquare, rnd;

        values = [];
        gamePresenter.tiles = [];

        gridSquare = gamePresenter.GRID_LENGTH * gamePresenter.GRID_LENGTH;

        for (i = 0; i < gridSquare; i++) {
            value = Math.ceil((Math.random() * gamePresenter.MAX_TILE_SIZE));
            rnd = Math.ceil((Math.random() * gamePresenter.MAX_TILE_SIZE));
            
            while (value === rnd) {
                rnd = Math.ceil((Math.random() * gamePresenter.MAX_TILE_SIZE));
            }
            
            gamePresenter.tiles.push(new Tile(value, rnd));
        }
    },
    onTapTile: function() {
        alert('test');
    }
};