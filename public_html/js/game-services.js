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
    CLIENT_ID: '218442145746-o068hr95h3p40g3kgqa63ef9dkub4cfv.apps.googleusercontent.com',
    CLIENT_SECRET: 'xgBwEsSTrSmnIi53WH1C0nge',
    
    signIn: function() {
        var data, authWindow;

        data = $.param({
            client_id: gameServices.CLIENT_ID,
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob:auto',
            scope: 'email profile',
            origin: 'http://localhost',
            response_type: 'code'
        });

        //http://phonegap-tips.com/articles/google-api-oauth-with-phonegaps-inappbrowser.html
        authWindow = window.open('https://accounts.google.com/o/oauth2/auth?' + data, '_blank');

        $(authWindow).bind('loadstart', function(e) {
            var url = e.originalEvent.url;
            
            alert(url);
//            var code = /\?code=(.+)$/.exec(url);
//            var error = /\?error=(.+)$/.exec(url);
//
//            if (code || error) {
//                authWindow.close();
//            }

//            if (code) {
//                //Exchange the authorization code for an access token
//                $.post('https://accounts.google.com/o/oauth2/token', {
//                    code: code[1],
//                    client_id: gameServices.CLIENT_ID,
//                    client_secret: gameServices.CLIENT_SECRET,
//                    redirect_uri: 'http://localhost',
//                    grant_type: 'authorization_code'
//                }).done(function(data) {
//                    alert(data.access_token);
//                }).fail(function(response) {
//                    alert(response.responseJSON);
//                });
//            } else if (error) {
//                //The user denied access to the app
//                alert('denied');
//            }
        });
    }
};