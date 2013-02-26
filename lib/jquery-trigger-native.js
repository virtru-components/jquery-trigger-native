/**
 * jquery-trigger-native.js
 *
 * Provides a simple interface to dispatch native events
 *
 * Author: Reuven V. Gonzales
 * Copyright (c) 2013 Reuven V. Gonzales
 * License: MIT
 */
(function($) {
  var defaultEventOptions = {
    canBubble: true,
    cancelable: true,
    view: window,
    detail: 1,
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: null,
    extra: {},
    processor: function() {}
  };

  var mouseEvents = [
    'click',
    'contextmenu',
    'dblclick',
    'DOMMouseScroll',
    'drag',
    'dragdrop',
    'dragend',
    'dragenter',
    'dragexit',
    'draggesture',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel'
  ];

  var uiEvents = [
    'abort',
    'activate',
    'beforeactivate',
    'beforedeactivate',
    'deactivate',
    'DOMActivate',
    'DOMFocusIn',
    'DOMFocusOut',
    'overflow',
    'resize',
    'scroll',
    'select',
    'underflow'
  ];

  $.fn.triggerNative = function(eventType, options) {
    options = options || defaultEventOptions;
    var event = null;
    // If it's mouse event
    if(mouseEvents.indexOf(eventType) >= 0) {
      event = document.createEvent('MouseEvent');
      event.initMouseEvent(
        eventType, 
        options.canBubble,
        options.cancelable,
        options.view,
        options.detail,
        options.screenX,
        options.screenY,
        options.ctrlKey,
        options.altKey,
        options.shiftKey,
        options.metaKey,
        options.button,
        options.relatedTarget
      );
    } else if(uiEvents.indexOf(eventType) >= 0) {
      event = document.createEvent('UIEvent');
      event.initUIEvent(
        eventType,
        options.canBubble,
        options.cancelable,
        options.detail
      );
    } else {
      event = document.createEvent('Event');
      event.initEvent(
        eventType,
        options.canBubble,
        options.cancelable
      );
    }
    var extra = options.extra;
    for(var name in extra) {
      event[name] = extra[name];
    }
    var processor = options.processor;
    processor.apply(null, [event]);
    this.each(function() {
      this.dispatchEvent(event);
    });
    return this;
  };
})(jQuery);
