void function (WIN,DOC) {

  if (!('performance' in WIN)) {
    WIN.performance = {
      'now': function () { return new WIN.Date().getTime() }
    };
  }

  // initial check
  checkDocument();

  // subsequent checks
  WIN.addEventListener('scroll', debounce(checkDocument, 100), false);

  function checkDocument(){
    var nodes = DOC.getElementsByTagName('a');
    var i = 0;

    for (; i < nodes.length; ++i) {

      var _url = '';
      var _iframe_src = '';
      var _vid_query_string = '';

      if (typeof nodes[i].href === 'undefined' || nodes[i].href.length < 5 || !isInViewport(nodes[i])) {
        return;
      }

      _url = nodes[i].href;

      if (_url.match(/http:/)) {
        _url = _url.replace('http:','https:');
      }

      if (_url.match(/(youtube\.com\/watch\?v=\w+)/)) {
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\?]+$/)[0].match(/[^=]+$/)[0];
      } else if (_url.match(/(youtu.be\/\w+)/)) {
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\/]+$/)[0];
      }

      if (_iframe_src.length > 0) {
        makeInlineFrame(_iframe_src, nodes[i]);
      }

    }

  }

  function makeInlineFrame (url, to_replace) {

    var _16x9_div = DOC.createElement('div');
    var _iframe = '<iframe src="' + url + '" style="position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%" sandbox="allow-scripts allow-same-origin" frameborder="0"></iframe>';

    _16x9_div.setAttribute('style','position:relative;padding-bottom:56.2%;');

    if (to_replace && to_replace.nodeType === 1) {
      to_replace.parentNode.replaceChild(_16x9_div, to_replace);
      _16x9_div.insertAdjacentHTML('afterBegin', _iframe);
    }
  }

  function isInViewport (el) {
    var r = el.getBoundingClientRect();
    return r.top >= 0 && r.left >= 0 && r.top <= WIN.innerHeight;
  }

  function debounce (f, wait) {
    var scheduled, args, context, timestamp;
    return function () {
      context = this;
      args = [];
      timestamp = WIN.performance.now;

      for (var i = 0; i < arguments.length; ++i){
        args[i] = arguments[i];
      }

      function later () {
        var last = WIN.performance.now - timestamp;
        if (last < wait) {
          scheduled = WIN.setTimeout(later, wait - last);
        } else {
          scheduled = null;
          f.apply(context, args);
        }
      }
      if (!scheduled) {
       scheduled = WIN.setTimeout(later, wait);
      }
    }
  }

}(window,window.document);
