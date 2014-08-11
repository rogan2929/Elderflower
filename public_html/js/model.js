/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var model = {
    clearGame: function() {
        localStorage.removeItem('gameData');
    },
    /**
     * Loads the game data.
     * @returns {GameData}
     */
    loadGame: function() {
        return JSON.parse(localStorage.getItem('gameData'));
    },
    /**
     * Saves the game data.
     * @param {GameData} gameData
     */
    saveGame: function(gameData) {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    }
};