/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Model class.
 * @type type
 */
var model = {
    /**
     * Clears saved game data.
     */
    clearGame: function() {
        localStorage.removeItem('gameData');
    },
    /**
     * Retrieves whether or not the app has connected to Game Services or Game Center.
     * @returns {DOMString}
     */
    getConnectionStatus: function() {
        return localStorage.getItem('connectionStatus');
    },
    /**
     * Loads the game data.
     * @returns {GameData}
     */
    loadGame: function() {
        return JSON.parse(localStorage.getItem('gameData'));
    },
    /**
     * Loads game speed.
     * @returns {DOMString}
     */
    loadGameSpeed: function() {
        return localStorage.getItem('gameSpeed');
    },
    /**
     * Saves the game data.
     * @param {GameData} gameData
     */
    saveGame: function(gameData) {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    },
    /**
     * Saves the game speed.
     * @param {type} speed
     */
    saveGameSpeed: function(speed) {
        localStorage.setItem('gameSpeed', speed);
    },
    /**
     * Saves whether or not the app has connected to Game Services or Game Center.
     * @param {type} status
     */
    setConnectionStatus: function(status) {
        localStorage.setItem('connectionStatus', status);
    }
};