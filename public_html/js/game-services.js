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
    CLIENT_ID: '218442145746-puhv60r2bt1342qmupgt13tptnsi67r4.apps.googleusercontent.com',
    CLIENT_SECRET: 'xgBwEsSTrSmnIi53WH1C0nge',
    
    signIn: function() {
        var data, authWindow;

        data = $.param({
            client_id: gameServices.CLIENT_ID,
            redirect_uri: 'postmessage',
            cookie_policy: 'single_host_origin',
            scope: 'https://www.googleapis.com/auth/plus.login',
            origin: 'http://localhost',
            response_type: 'code',
            include_granted_scopes: 'true'
        });

        authWindow = window.open('https://accounts.google.com/o/oauth2/auth?' + data, '_blank');

        $(authWindow).on('loadstart', function(e) {
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
                    client_id: gameServices.CLIENT_ID,
                    client_secret: gameServices.CLIENT_SECRET,
                    redirect_uri: 'http://localhost',
                    grant_type: 'authorization_code'
                }).done(function(data) {
                    alert(data.access_token);
                }).fail(function(response) {
                    alert(response.responseJSON);
                });
            } else if (error) {
                //The user denied access to the app
                alert('denied');
            }
        });
    }
};