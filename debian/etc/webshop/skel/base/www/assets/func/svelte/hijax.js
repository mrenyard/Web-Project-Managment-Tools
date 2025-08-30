/**
 * Author: renyard.m
 */
var SVELTE = window.SVELTE || {};

SVELTE.hijax = function() {

  if (typeof XMLHttpRequest === 'undefined') {
    XMLHttpRequest = function () {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (e) {}
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (e) {}
      try {
        return new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {}
      return false;
    };
  }

  var _lightbox = document.createElement('div'),
      _dialogue = document.createElement('div');

  _lightbox.setAttribute('id','lightbox'); _dialogue.setAttribute('id', 'dialogue');
  _lightbox.appendChild(_dialogue); document.body.appendChild(_lightbox);
  _dialogue.remove = undefined;

  _dialogue.open = function() {
    _lightbox.classList.add('open');
    _dialogue.setAttribute('tabindex', '0'); _dialogue.focus();
    _dialogue.addEventListener('blur', function() { this.focus(); });
  };

  var _handleResponse = function(request) {
    if (request.readyState == 4) {
      var fragHTML = request.responseText;
      switch (request.status) {
        case 200: // Ok
        case 201: // Created
        case 202: // Accepted
        case 304: // Not Modified
        case 400: // Bad Request
          var fragRoot = request.responseXML.documentElement,
              elWithId = fragRoot,
              nParents = 0;
          do {
            if (elWithId.getAttribute('id') !== null) { break; }
            elWithId = elWithId['children'][0];
            nParents++;
          } while (elWithId);

          var pageEl = document.getElementById(elWithId.getAttribute('id'));
          while (nParents > 0) {
            pageEl = pageEl['parentNode'];
            nParents--;
          }
          pageEl.outerHTML = fragHTML;
          return document.getElementById(elWithId.getAttribute('id'));
          break;
        case 302: // Found (treating same as 303)
        case 303: // See Other (redirect)
            // browser handles redirect internally
          break;
        default: // load in lightbox
          fragHTML = (fragHTML !== '')? fragHTML :
            '<h1>' + request.status + ' ' + request.statusText + '</h1>';
          this.dialogue.innerHTML = fragHTML;
          this.dialogue.open();
          break;
      }
    }
    return false;
  };

  return {
    dialogue: _dialogue,
    handleResponse: function(request) { return _handleResponse(request); }
  };
}();

SVELTE.hijax.form = function() {

  var _type = { 'CREATE':0, 'UPDATE':1, 'FILTER':3 };

  var _field = {

    check: function(el)
    {
      el.addEventListener('change', function(){
        var message,
            elId = this.getAttribute('id'),
            form = this.form,
            url  = '/dev/' + (elId.replace(/:/g, '/')),
            data = elId + '=' + this.value,
            request = new XMLHttpRequest();

        if (request) {

          request.onreadystatechange = function() {
            var el;
            if (el = SVELTE.hijax.handleResponse(request)) {
              var form = el.form;
              switch (form.formType) {
                case 0: // CREATE
                  if (form.getElementsByClassName('checked').length == (form.length-1)) {
                    sbmt = form.elements[form.elements.length-1];
                    sbmt.value = 'Confirm & Create';
                  }
                  break;
                case 1: // UPDATE
                  window.setTimeout(SVELTE.hijax.form.field.reset, (10 *1000), el);
                  break;
              }
              SVELTE.hijax.form.field.check(el);
            }
          };

          request.open(form.method.toUpperCase(), url, true);
          request.setRequestHeader('Content-Type', form.enctype);
          request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          request.send(data);

          this.parentNode.classList.remove('error');
          this.parentNode.classList.remove('checked');
          if (message = this.parentNode.getElementsByClassName('message')[0]) {
            message.parentNode.removeChild(message);
          }
          this.parentNode.classList.add('checking');
          this.setAttribute('tabindex', '-1');
        }
      });

      el.addEventListener('blur', function(){ SVELTE.hijax.form.field.next(this); });

    },

    reset: function(el)
    {
      el.parentNode.classList.remove('checked');
      el.setAttribute('tabindex', '0');
    },

    next: function(el)
    {
      var form = el.form, errors = form.getElementsByClassName('error');
      if (errors && errors.length > 0) { errors[0].focus(); }
    }

  };

  var i=0,f,reg=/:new/;
  while (f = document.forms[i++]) {

    // set formType based on form.element.id
    f.formType = (reg.test(f.id))? _type.CREATE : _type.UPDATE;

    // loop form.elements
    var j=0, fel;
    while (fel = f.elements[j++]) {
      switch (fel.type) {
        case 'fieldset':
          continue; // next formElement
        case 'submit':
          if (f.formType === _type.CREATE) { fel.value = 'Create'; }
          // full throught!
        case 'reset':
          if (f.formType === _type.UPDATE) { fel.parentNode.removeChild(fel); continue; }
          break;
        default:
          window.setTimeout(_field.reset, (2 *1000), fel);
          // add default focus event
          if (f.formType == _type.CREATE) {
            fel.addEventListener('focus', function(){
              if (this.className != 'populated') { this.className = 'populated'; }
            });
          }
          _field.check(fel);
          break;
      } // END switch
      fel.addEventListener('blur', function(){ _field.next(this); });
    } // END while form.elements
  } // END while forms

  return {
    type: _type,
    field: _field
  };
}();
