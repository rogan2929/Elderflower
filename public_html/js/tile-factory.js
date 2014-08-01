/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Factory for creating tiles.
 * @type type
 */
var tileFactory = {
    /**
     * Generate a tile object.
     * @returns {Tile}
     */
    generateTile: function() {
        var tile, color, value;

        value = Math.ceil((Math.random() * gamePresenter.MAX_TILE_SIZE));
        color = Math.ceil((Math.random() * gamePresenter.MAX_TILE_SIZE));

        while (value === color) {
            color = Math.ceil((Math.random() * gamePresenter.MAX_TILE_SIZE));
        }

        tile = new Tile(value, color);

        return tile;
    },
    /**
     * Generate tile values and colors.
     * @return {Tile}
     */
    generateTiles: function() {
        var i, gridSquare, tile, tiles;

        values = [];
        tiles = [];

        gridSquare = gamePresenter.GRID_LENGTH * gamePresenter.GRID_LENGTH;

        for (i = 0; i < gridSquare; i++) {
            tile = tileFactory.generateTile();

            while (tiles.contains(tile)) {
                tile = tileFactory.generateTile();
            }

            tiles.push(tile);
        }
        
        return tiles;
    }
};