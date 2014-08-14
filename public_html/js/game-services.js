/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

GameServiceTypes = {
    GOOGLE: 0,
    APPLE: 1
}

/**
 * Wrapper for Google Game Services
 * @type type
 */
var gameServices = {
    accessToken: null,
    // TODO: Token expiration time must be examined before every API call.
    expirationTime: null,
    leaderboard: null,
    type: null,
    /**
     * Getter for authenticated.
     * @returns {Boolean}
     */
    getAuthenticated: function() {
        return (gameServices.accessToken !== null);
    },
    /**
     * Retrieve leaderboard data.
     * @returns {type}
     */
    getLeaderboardData: function(callback) {
        if (gameServices.type === GameServiceTypes.GOOGLE) {
            gameServices.getLeaderboardDataGoogle(callback);
        }
        else if (gameServices.type === GameServiceTypes.APPLE) {

        }
    },
    /**
     * Retrieves leaderboard data from Google Game Services.
     * @param {type} callback
     */
    getLeaderboardDataGoogle: function(callback) {
        $.get(gameServices.leaderboard + '/scores/PUBLIC', {
            timeSpan: 'WEEKLY'
        }).done(function(data) {
            callback.call(gameServices, data);
        });
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
        else {
            // Connect to Game Services
            gameServices.signInGoogleWeb(success, fail);
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

        gameServices.type = GameServiceTypes.GOOGLE;
        gameServices.leaderboard = 'https://www.googleapis.com/games/v1/leaderboards/CgkI0r-q4a0GEAIQAA';

        // Values from Google Developer Console.
        clientId = '218442145746-7s9ofsa0i2ue6pjm51g627h0se8s359r.apps.googleusercontent.com';
        clientSecret = 'TP0EE_7_OYYtETdfrBn8HG0a';

        data = $.param({
            client_id: clientId,
            redirect_uri: 'http://localhost',
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/games',
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
     * Signs into Google Game Services via web.
     * @param {type} success
     * @param {type} fail
     */
    signInGoogleWeb: function(success, fail) {
        var data, clientId, clientSecret, authWindow, interval;

        gameServices.type = GameServiceTypes.GOOGLE;
        gameServices.leaderboard = 'https://www.googleapis.com/games/v1/leaderboards/CgkI0r-q4a0GEAIQAA';

        // Values from Google Developer Console.
        clientId = '218442145746-7s9ofsa0i2ue6pjm51g627h0se8s359r.apps.googleusercontent.com';
        clientSecret = 'TP0EE_7_OYYtETdfrBn8HG0a';

        data = $.param({
            client_id: clientId,
            redirect_uri: 'http://elderflower.azurewebsites.net/oauthcallback',
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/games',
            origin: 'http://localhost',
            response_type: 'code'
        });

        authWindow = window.open('https://accounts.google.com/o/oauth2/auth?' + data, '_blank');

        // Wait for the window to close, indicating that the user has authenticated the app through the callback.
        interval = setInterval(function() {
            if (authWindow == null || authWindow.closed) {
                var url = localStorage.getItem('oauth_url');
                var code = /\?code=(.+)$/.exec(url);
                var error = /\?error=(.+)$/.exec(url);
                
                // Truncate the code string further.
                code = code[1].substring(0, s.indexOf('='));

                if (code) {
                    //Exchange the authorization code for an access token
                    $.post('https://accounts.google.com/o/oauth2/token', {
                        code: code,
                        client_id: clientId,
                        client_secret: clientSecret,
                        redirect_uri: 'http://localhost',
                        grant_type: 'authorization_code'
                    }).done(function(data) {
                        gameServices.accessToken = data.access_token;
                        success.call(gameServices);
                    }).fail(function(data) {
                        gameServices.accessToken = null;
                        fail.call(gameServices, data.error);
                    });
                } else if (error) {
                    //The user denied access to the app
                    gameServices.accessToken = null;
                }
                
                clearInterval(interval);
            }
        }, 1000);
    },
    /**
     * Signs into Game Center
     * Uses PhoneGap Game Center plugin: https://build.phonegap.com/plugins/880
     * @param {type} success
     * @param {type} fail
     */
    signInIOS: function(success, fail) {
        alert('Not yet implemented.');
        gameServices.type = GameServiceTypes.APPLE;
    },
    /**
     * Submits a score to the leaderboard.
     * @param {type} score
     * @param {type} callback
     */
    submitScore: function(score, callback) {
        if (gameServices.type === GameServiceTypes.GOOGLE) {
            gameServices.submitScoreGoogle(score, callback);
        }
        else if (gameServices.type === GameServiceTypes.APPLE) {
            gameServices.submitScoreApple(score, callback);
        }
    },
    /**
     * Submit a score to Game Center.
     * @param {type} score
     * @param {type} callback
     */
    submitScoreApple: function(score, callback) {

    },
    /**
     * Submit a score to Google Game Services.
     * @param {type} score
     * @param {type} callback
     */
    submitScoreGoogle: function(score, callback) {
        $.post(gameServices.leaderboard + '/scores', {
            score: score
        }).done(callback);
    }
};