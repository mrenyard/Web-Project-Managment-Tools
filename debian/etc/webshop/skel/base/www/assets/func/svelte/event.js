/**
 * Author: renyard.m
 */
var SVELTE = window.SVELTE || {};

SVELTE.event = function() {

  var _isT = ('ontouchstart' in window);

  var _s   = (_isT)? 'touchstart' : 'mousedown',
      _m   = (_isT)? 'touchmove' : 'mousemove',
      _e   = (_isT)? 'touchend' : 'mouseup',
      _a   = [],
      _lT  = null;

  var b = document.getElementsByTagName('body')[0];
  b.addEventListener(_e, function(e) {
    e.preventDefault();
    for (var i=0, j=_a.length; i < j; i++) {
      var a = _a[i];
      var t = e.target;
      while (t) {
        if (t === a.startElement) {
          a.endAction(e, _lT);
          _lT = null;
          return;
        }
        t = t.parentNode;
      }
    }
  }, true);

  b.addEventListener(_m, function(e) {
    e.preventDefault();
    var t = e.touches[0];
    _lT = document.elementFromPoint(t.pageX, t.pageY);
    for (var i=0, j=_a.length; i < j; i++) {
      var a = _a[i];
      var t = e.target;
      while (t) {
        if (t === a.startElement) {
          a.moveAction(_lT);
          break;
        }
        t = t.parentNode;
      }
    }
  }, true);

  var _r = function(sE, sA, mA, eA) {
    _a[_a.length] = { 'startElement':sE, 'startAction':sA, 'moveAction':mA, 'endAction':eA};
    sE.addEventListener(_s, function(e) {
      e.preventDefault();
      _lT = sE;
      for (var i=0, j=_a.length; i < j; i++) {
        var a = _a[i];
        var t = e.target;
        while (t) {
          if (t === a.startElement) {
            a.startAction(e);
            return;
          }
          t = t.parentNode;
        }
      }
    }, true);
  };

  return {
    startEvent: _s,
    endEvent: _e,
    register: function(startElement, startAction, moveAction, endAction) {
      _r(startElement, startAction, moveAction, endAction);
    }
  };
}();
