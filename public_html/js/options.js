/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Creates an Options object.
 * @param {type} speed
 * @param {type} length
 * @returns {Options}
 */
function Options(speed, length) {  
    this.speed = speed;
    this.length = length;
}

/**
 * Setter for speed.
 * @param {type} speed
 */
Options.prototype.setSpeed = function(speed) {
    this.speed = speed;
};

/**
 * Getter for speed.
 * @returns {type}
 */
Options.prototype.getSpeed = function() {
    return this.speed;
};

/**
 * Setter for length.
 * @param {type} length
 */
Options.prototype.setLength = function(length) {
    this.length = length;
};

/**
 * Getter for length.
 * @returns {type}
 */
Options.prototype.getLength = function() {
    return this.length;
};