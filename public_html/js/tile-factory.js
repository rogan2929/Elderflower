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
     * @param {type} maxTileSize
     * @returns {Tile}
     */
    generateTile: function(maxTileSize) {
        var tile, color, value;

        value = Math.ceil((Math.random() * maxTileSize));
        color = Math.ceil((Math.random() * maxTileSize));

        while (value === color) {
            color = Math.ceil((Math.random() * maxTileSize));
        }

        tile = new Tile(value, color);

        return tile;
    },
    /**
     * Generate tile values and colors.
     * @param {type} length
     * @param {type} maxTileSize
     * @return {Tile}
     */
    generateTiles: function(length, maxTileSize) {
        var i, gridSquare, tile, tiles;

        tiles = [];

        gridSquare = length * length;

        for (i = 0; i < gridSquare; i++) {
            tile = tileFactory.generateTile(maxTileSize);

            while (tiles.contains(tile)) {
                tile = tileFactory.generateTile(maxTileSize);
            }

            tiles.push(tile);
        }
        
        return tiles;
    }
};