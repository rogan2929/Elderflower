/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// When ready, navigate to the game page.
$(document).on('pageinit', function() {
    setTimeout(function() {
        $('body').pagecontainer('change', '#game');
    }, 1000);
});