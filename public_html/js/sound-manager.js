/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Music manager.
 * @type type
 */
var soundManager = {
    playSound: function(id) {
        var element, url, media;
        
        element = document.getElementById(id);
        url = element.getAttribute('src');
        
        if (typeof(Media) !== 'undefined') {
            media = new Media(url);
        }
        else {
            media = new Audio(url);
        }
        
        media.play();
    },
    /**
     * Starts the background music.
     */
    startMusic: function() {
    },
    /**
     * Stops the background music.
     */
    stopMusic: function() {
    }
};