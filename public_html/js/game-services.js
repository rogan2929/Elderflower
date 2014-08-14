/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Wrapper for Google Game Services
 * @type type
 */
var gameServices = {
    accessToken: null,
    /**
     * Getter for authenticated.
     * @returns {Boolean}
     */
    getAuthenticated: function() {
        return (gameServices.accessToken !== null);
    },
    /**
     * Signs in and authorizes the app.
     * @param {type} success
     * @param {type} fail
     */
    signIn: function(success, fail) {
        if (window.device) {
            // Determine the platform, so user can be directed to either Google Play or App Store.
            switch (window.device.platform) {
                case 'Android':
                    // Connect to Game Services
                    gameServices.signInGoogle(success, fail);
                    break;
                case 'iOS':
                    // Connect to Game Center
                    gameServices.signInIOS(success, fail);
                    break;
            }
        }
    },
    /**
     * Signs into Google Game Services.
     * Credits to http://phonegap-tips.com/articles/google-api-oauth-with-phonegaps-inappbrowser.html
     * @param {type} success
     * @param {type} fail
     */
    signInGoogle: function(success, fail) {
        var data, authWindow, clientId, clientSecret;
        
        // Values from Google Developer Console.
        clientId = '218442145746-7s9ofsa0i2ue6pjm51g627h0se8s359r.apps.googleusercontent.com';
        clientSecret = 'TP0EE_7_OYYtETdfrBn8HG0a';

        data = $.param({
            client_id: clientId,
            redirect_uri: 'http://localhost',
            scope: 'login',
            origin: 'http://localhost',
            response_type: 'code'
        });

        authWindow = window.open('https://accounts.google.com/o/oauth2/auth?' + data, '_blank', 'location=no,toolbar=no');

        $(authWindow).bind('loadstart', function(e) {
            var url = e.originalEvent.url;
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                authWindow.close();
            }

            if (code) {
                //Exchange the authorization code for an access token
                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1],
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: 'http://localhost',
                    grant_type: 'authorization_code'
                }).done(function(data) {
                    gameServices.accessToken = data.access_token;
                    alert(gameServices.accessToken);
                    success.call(gameServices);
                }).fail(function(data) {
                    gameServices.accessToken = null;
                    fail.call(gameServices, data.error);
                });
            } else if (error) {
                //The user denied access to the app
                gameServices.accessToken = null;
            }
        });
    },
    /**
     * Signs into Game Center
     * Uses PhoneGap Game Center plugin: https://build.phonegap.com/plugins/880
     * @param {type} success
     * @param {type} fail
     */
    signInIOS: function(success, fail) {
        alert('Not yet implemented.');
    }
};