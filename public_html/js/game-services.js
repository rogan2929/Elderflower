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
    signIn: function() {
        var data, authWindow;

        data = $.param({
            client_id: gameServices.CLIENT_ID,
            redirect_uri: 'http://localhost',
            cookie_policy: 'single_host_origin',
            scope: 'https://www.googleapis.com/auth/plus.login',
            origin: 'http://localhost',
            response_type: 'code token id_token gsession',
            include_granted_scopes: 'true'
        });

        authWindow = window.open('https://accounts.google.com/o/oauth2/auth?' + data, '_blank', 'location=no,toolbar=no');

        $(authWindow).on('loadstart', function(e) {
            var url = e.originalEvent.url;
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                authWindow.close();
            }

            //TODO - exchange code for access token...
            alert(url);
        });
    }
};