/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #options
 * @type type
 */
var optionsView = {
    /**
     * Sets the game speed control.
     * @param {type} index
     */
    setGameSpeed: function(index) {
        $('#select-game-speed')[0].selectedIndex = index;
        $('#select-game-speed').selectmenu('refresh');
    },
    /**
     * Sets the length slider control value.
     * @param {type} length
     */
    setLength: function(length) {
        $('#slider-length').val(length).slider('refresh');
    }
};