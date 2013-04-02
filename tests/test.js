var assert = require('chai').assert,
    $ = require('../lib/jquery-trigger-native');

var TESTER_DIV = '<div id="tester">This is a test</div>';

describe('jQuery.fn.triggerNative', function() {
  var testerJQEl = null;
  var testerRawEl = null;
  beforeEach(function() {
    testerJQEl = $(TESTER_DIV);
    testerRawEl = testerJQEl[0];
    $(document.body).append(testerJQEl);
  });
  afterEach(function() {
    testerJQEl.remove();
  });

  it('performs a mouse event', function(done) {
    testerRawEl.addEventListener('click', function() {
      done();
    });
    testerJQEl.triggerNative('click');
  });

  it('performs a ui event', function(done) {
    window.addEventListener('resize', function() {
      done();
    });
    $(window).triggerNative('resize');
  });

  it('performs an arbitrary event', function(done) {
    testerRawEl.addEventListener('arbitrary-event', function() {
      done();
    });
    testerJQEl.triggerNative('arbitrary-event');
  });
});
