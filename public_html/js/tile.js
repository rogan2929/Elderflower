/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Tile object.
 * @param {type} value
 * @param {type} color
 */
function Tile(value, color) {
    this.value = value;
    this.color = color;
}
;

/**
 * Setter for value.
 * @param {type} value
 */
Tile.prototype.setValue = function(value) {
    this.value = value;
};

/**
 * Getter for value.
 * @returns {type}
 */
Tile.prototype.getValue = function() {
    return this.value;
};

/**
 * Setter for color.
 * @param {type} color
 */
Tile.prototype.setColor = function(color) {
    this.color = color;
};

/**
 * Getter for color.
 * @returns {type}
 */
Tile.prototype.getColor = function() {
    return this.color;
};

/**
 * Equals operator function
 * @param {Tile} tile
 * @returns {type}
 */
Tile.prototype.equals = function(tile) {
    return (this.value === tile.value && this.color === tile.color);
};