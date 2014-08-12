/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Music manager.
 * @type type
 */
var musicPlayer = {
    /**
     * Starts the background music.
     */
    startMusic: function() {
        var music = document.getElementById('loop');

        $(music).bind('ended', function() {
            this.currentTime = 0;
            this.load();
            this.play();
        });

        music.play();
    },
    /**
     * Stops the background music.
     */
    stopMusic: function() {
        var music = document.getElementById('loop');
        music.abort();
    }
};