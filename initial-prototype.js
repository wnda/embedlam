void function (WIN,DOC) {

  if (!('performance' in WIN)) {
    WIN.performance = {
      'now': function () { return new WIN.Date().getTime() }
    };
  }

  // initial check
  checkDocument();
  
  // subsequent checks
  WIN.addEventListener('scroll', debounce(checkDocument), false);
  
  function checkDocument(){
    var nodes = [].slice.call(DOC.getElementsByTagName('a'));

    nodes.forEach( function (link) {
      var _url = '';
      var _iframe_src = '';
      var _vid_query_string = '';

      if (typeof link.href === 'undefined' || link.href.length < 5 || !isInViewport(link)) {
        return;
      }

      _url = link.href;

      if (_url.match(/http:/)) {
        _url = _url.replace('http:','https:');
      }

      if (_url.match(/(youtube\.com\/watch\?v=\w+)/)) {
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\?]+$/)[0].match(/[^=]+$/)[0];
      } else if(_url.match(/(youtu.be\/\w+)/)) {
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\/]+$/)[0];
      }

      if (_iframe_src.length > 0) {
        makeInlineFrame(_iframe_src, link);
      }

    });
  }

  function makeInlineFrame (url, to_replace) {
    var _iframe = DOC.createElement('iframe');
    
    _iframe.src = url;
    _iframe.setAttribute('frameborder', '0');
    _iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    _iframe.setAttribute('allowfullscreen', '');

    if (to_replace && to_replace.nodeType === 1) {
      to_replace.parentNode.replaceChild(_iframe, to_replace);
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
