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

        if (window.device) {
            // Determine the platform, so user can be directed to either Google Play or App Store.
            switch (window.device.platform) {
                case 'Android':
                    url = '/android_asset/www/' + url;
                    break;
                case 'iOS':
                    break;
                default:
                    break;
            }
        }

        if (typeof (Media) !== 'undefined') {
            media = new Media(url,
                    function() {
                    },
                    function(err) {
                        alert('playSound() error: ' + err.code);
                    });
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