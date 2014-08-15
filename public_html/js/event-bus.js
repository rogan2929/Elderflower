/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Event bus.
 * @type type
 */
var eventBus = {
    handlers: {},
    /**
     * Register an event handler.
     * @param {type} name
     * @param {type} handler
     * @param {type} selector
     * @param {type} event
     */
    installHandler: function(name, handler, selector, event) {
        eventBus.handlers[name] = handler;
        $(selector).off(event).on(event, function(e, args) {
            eventBus.handlers[name].call(eventBus, e, args);
        });
    }
};