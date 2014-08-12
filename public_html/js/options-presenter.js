/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #options
 * @type type
 */
var optionsPresenter = {
    init: function() {
        var speed;
        
        speed = model.loadGameSpeed();
        
        // Attempt to set the game speed.
        if (speed) {
            optionsView.setGameSpeed(speed);
        }
        else {
            optionsView.setGameSpeed(2);      // Assume normal speed.
        }
        
        //eventBus.installHandler('optionsPresenter.onChangeSelectGameSpeed', optionsPresenter.onChangeSelectGameSpeed, '#select-game-speed', 'change');
        
        // Not sure why... but for some reason we have to bypass the eventBus. It prevents the ui from updating after the change event fires.
        $("#select-game-speed").bind("change", optionsPresenter.onChangeSelectGameSpeed);
    },
    onChangeSelectGameSpeed: function(e) {
        // Save the game speed.
        model.saveGameSpeed($(e.currentTarget)[0].selectedIndex);
    }
};