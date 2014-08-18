/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

GameServiceTypes = {
    GOOGLE: 0,
    APPLE: 1
};

/**
 * Wrapper for Google Game Services
 * @type type
 */
var gameServices = {
    accessToken: null,
    expirationTime: null,
    leaderboard: null,
    type: null,
    /**
     * Getter for authenticated.
     * @returns {Boolean}
     */
    getConnectionStatus: function() {
        // Test these things:
        // accessToken isn't null
        // accessToken isn't expired
        // network connection is present.

        return (gameServices.accessToken !== null);
    },
    /**
     * Retrieve leaderboard data.
     * @param {type} success
     * @param {type} fail
     * @param {type} timeSpan
     * @param {type] signin
     * @returns {type}
     */
    getLeaderboardData: function(success, fail, timeSpan, signin) {
        if (gameServices.type === GameServiceTypes.GOOGLE) {
            gameServices.getLeaderboardDataGoogle(success, fail, timeSpan, signin);
        }
        else if (gameServices.type === GameServiceTypes.APPLE) {

        }
    },
    /**
     * Retrieves leaderboard data from Google Game Services.
     * This retrieves scores that are similar in rank to the authenticated user.
     * https://developers.google.com/games/services/web/api/scores/listWindow
     * @param {type} success
     * @param {type} fail
     * @param {type} timeSpan
     */
    getLeaderboardDataGoogle: function(success, fail, timeSpan, signin) {
        if (gameServices.getConnectionStatus()) {
            $.get(gameServices.leaderboard + '/window/PUBLIC', {
                timeSpan: timeSpan,
                access_token: gameServices.accessToken
            }).done(function(data) {
                success.call(gameServices, data);
            }).fail(function(data) {
                fail.call(gameServices, 'Unable to retrieve leaderboard data.');
            });
        }
        else {
            if (signin) {
                gameServices.signIn(function() {
                    $.get(gameServices.leaderboard + '/window/PUBLIC', {
                        timeSpan: timeSpan,
                        access_token: gameServices.accessToken
                    }).done(function(data) {
                        success.call(gameServices, data);
                    }).fail(function(data) {
                        fail.call(gameServices, 'Unable to retrieve leaderboard data.');
                    });
                }, fail);
            }
            else {
                fail.call(gameServices, 'Unable to sign in.');
            }
        }
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
        
        // TODO: Test for network connectivity.

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
                    fail.call(gameServices, 'Unable to sign in.');
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
            response_type: 'token'
        });

        authWindow = window.open('https://accounts.google.com/o/oauth2/auth?' + data, '_blank');

        // Wait for the window to close, indicating that the user has authenticated the app through the callback.
        interval = setInterval(function() {
            if (authWindow == null || authWindow.closed) {
                var url, error, token;

                url = localStorage.getItem('oauth_url');
                error = /\?error=(.+)$/.exec(url);

                if (!error && url) {
                    token = /\#access_token=(.+)$/.exec(url);
                    token = token[1].substring(0, token[1].indexOf('&'));

                    gameServices.accessToken = token;
                    success.call(gameServices);
                }
                else {
                    gameServices.accessToken = null;
                }

                localStorage.removeItem('oauth_url');

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
     * @param {type} success
     * @param {type} fail
     * @param {type} signin
     */
    submitScore: function(score, success, fail, signin) {
        if (gameServices.getConnectionStatus()) {
            if (gameServices.type === GameServiceTypes.GOOGLE) {
                gameServices.submitScoreGoogle(score, success, fail);
            }
            else if (gameServices.type === GameServiceTypes.APPLE) {
                gameServices.submitScoreApple(score, success, fail);
            }
        }
        else {
            if (signin) {
                // Token not valid. Try again after signing back in.
                gameServices.signIn(function() {
                    if (gameServices.type === GameServiceTypes.GOOGLE) {
                        gameServices.submitScoreGoogle(score, success, fail);
                    }
                    else if (gameServices.type === GameServiceTypes.APPLE) {
                        gameServices.submitScoreApple(score, success, fail);
                    }
                }, function(error) {
                    fail.call(gameServices, 'Unable to submit score.');
                });
            }
            else {
                fail.call(gameServices, 'Unable to sign in.');
            }
        }
    },
    /**
     * Submit a score to Game Center.
     * @param {type} score
     * @param {type} success
     * @param {type} fail
     */
    submitScoreApple: function(score, success, fail) {

    },
    /**
     * Submit a score to Google Game Services.
     * @param {type} score
     * @param {type} success
     * @param {type} fail
     */
    submitScoreGoogle: function(score, success, fail) {
        $.post(gameServices.leaderboard + '/scores?access_token=' + gameServices.accessToken, {
            score: score
        }).done(success).fail(function() {
            fail.call(gameServices, 'Unable to submit score.');
        });
    }
};