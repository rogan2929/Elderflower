/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Create a basic Array.contains() function.
 * @param {type} obj
 * @returns {Boolean}
 */
Array.prototype.contains = function(obj) {
    var i, match;
    
    match = false;
    
    for (i = 0; i < this.length; i++) {
        // Check for equals() function.
        if (this[i].equals) {
            if (this[i].equals(obj)) {
                match = true;
            }
        }
        else {
            // Default to === operator.
            if (this[i] === obj) {
                match = true;
            }
        }
    }
    
    return match;
};

$(document).on('pagebeforeshow', '#game', function(e) {
    gamePresenter.init();
});