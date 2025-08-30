    <script async defer  type="text/javascript">

var svelte = window.svelte || {};

// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

svelte.script = function ()
{
   // Method for script loading (private)
  var _load = function (url, requires) {
    if (requires) {
      for (var i = 0, j = requires.length; i < j; i++) {
        if (!window.svelte[requires[i]]) {
          setTimeout(function () {
            _load(url, requires);
          }, 50);
          return;
        }
      }
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  return {
    load: function (url, required) { _load(url, required); }
  };
}();

svelte.script.load('/assets/func/svelte.state.js');
svelte.script.load('/assets/func/svelte.lightbox.js');
svelte.script.load('/assets/func/svelte.internal.js');
svelte.script.load('/assets/func/svelte.accordion.js');
svelte.script.load('/assets/func/svelte.navigation.js', ['state']);
svelte.script.load('/assets/func/svelte.navigation-sliders.js', ['navigation']);
svelte.script.load('/assets/func/svelte.maps.js', ['script']);
svelte.script.load('/assets/func/svelte.hijax.js', ['lightbox']);
svelte.script.load('/assets/func/svelte.forms.js', ['hijax']);

    </script>
