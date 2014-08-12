/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * GameData class constructor.
 * @param {type} score
 * @param {type} chances
 * @param {type} combo
 * @returns {GameData}
 */
function GameData(score, chances, combo) {
    this.score = score;
    this.chances = chances;
    this.combo = combo;
};

/**
 * Getter for score.
 * @returns {GameData.score}
 */
GameData.prototype.getScore = function() {
    return this.score;
};

/**
 * Getter for chances.
 * @returns {GameData.chances}
 */
GameData.prototype.getChances = function() {
    return this.chances;
};

/**
 * Getter for combo.
 * @returns {GameData.combo}
 */
GameData.prototype.getCombo = function() {
    return this.combo;
};