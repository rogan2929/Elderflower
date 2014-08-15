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
    options: null,
    
    init: function() {
//        var speed;
//        
//        speed = model.loadGameSpeed();
//        
//        // Attempt to set the game speed.
//        if (speed) {
//            optionsView.setGameSpeed(speed);
//        }
//        else {
//            optionsView.setGameSpeed(2);      // Assume normal speed.
//        }
        
        //eventBus.installHandler('optionsPresenter.onChangeSelectGameSpeed', optionsPresenter.onChangeSelectGameSpeed, '#select-game-speed', 'change');
        
        optionsPresenter.loadAllOptions();
    },
    /**
     * Loads all options.
     */
    loadAllOptions: function() {
        optionsPresenter.options = model.loadOptions();
        
        optionsView.setGameSpeed(optionsPresenter.options.getSpeed());
        optionsView.setLength(optionsPresenter.options.getLength());
    },
    /**
     * Saves all options.
     */
    saveAllOptions: function() {
        var speed, length;
        
        speed = $('#select-game-speed')[0].selectedIndex;
        length = $('#slider-length').val();
        
        optionsPresenter.options.setSpeed(speed);
        optionsPresenter.options.setLength(length);
        
        model.saveOptions(optionsPresenter.options);
    }
};