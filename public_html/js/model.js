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
     * Loads game options.
     * @returns {Array|Object}
     */
    loadOptions: function() {
        var options, opt;
        
        opt = JSON.parse(localStorage.getItem('options'));
        
        // Create a new Options object with defaults.
        options = new Options(2, 6);
        
        // If options have actually been set, then load them into the options object now.
        if (opt) {
            options.setSpeed(parseInt(opt.speed));
            options.setLength(parseInt(opt.length));
        }
        
        return options;
    },
    /**
     * Saves the game data.
     * @param {GameData} gameData
     */
    saveGame: function(gameData) {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    },
    /**
     * Saves the game options.
     * @param {type} options
     */
    saveOptions: function(options) {
        localStorage.setItem('options', JSON.stringify(options));
    },
    /**
     * Saves whether or not the app has connected to Game Services or Game Center.
     * @param {type} status
     */
    setConnectionStatus: function(status) {
        localStorage.setItem('connectionStatus', status);
    }
};