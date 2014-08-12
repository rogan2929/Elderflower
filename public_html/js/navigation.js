/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Navigation helper object.
 * @type type
 */
var navigation = {
    /**
     * Queue off a navigation to a different page.
     * @param {type} page
     * @param {type} refresh
     */
    navigateTo: function(page, refresh) {
        if (!refresh) {
            $('body').pagecontainer('change', '#' + page);
        }
        else {
            $('html').fadeOut(400, function() {
                $(location).attr('href', page);
            });
        }
    }
};