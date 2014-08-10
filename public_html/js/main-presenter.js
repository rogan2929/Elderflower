/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mainPresenter = {
    /**
    * Entry point
    */
    init: function() {
        // Load previous game, if it exists.
        
        eventBus.installHandler('mainPresenter.onTapBtnNew', mainPresenter.onTapBtnNew, '#btn-new', 'tap');
        eventBus.installHandler('mainPresenter.onTapBtnResume', mainPresenter.onTapBtnResume, '#btn-resume', 'tap');
    },
    onTapBtnNew: function(e) {
        gamePresenter.setNewGame(true);
    },
    onTapBtnResume: function(e) {
        gamePresenter.setNewGame(false);
    }
};