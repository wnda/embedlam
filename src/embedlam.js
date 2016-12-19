;(function (win, doc) {

  if (!('performance' in win)) {
    win.performance = {
      'now': function () { return new win.Date().getTime() }
    };
  }

  // initial check
  checkDocument();

  // subsequent checks
  win.addEventListener('scroll', debounce(checkDocument, 100), false);

  function checkDocument () {
    var nodes = [].slice.call( doc.getElementsByTagName('a') );

    nodes.forEach(function (link) {
      var iframe_src = '';
      var vid_query_string = '';

      if (typeof link.href === 'undefined' || link.href.length < 5 || !isInViewport(link)) {
        return;
      }

      iframe_src = processUrl( link.href );

      if (typeof iframe_src === 'string' && iframe_src.length > 0) {
        makeInlineFrame( iframe_src, link );
      }
    });
  }

  function processUrl (_url) {
    var _iframe_src = '';

    // rewrite urls to use https
    if (_url.match(/http:/)) {
      _url = _url.replace('http:', 'https:');
    }

    // chop off trailing slash
    if (_url.slice(-1) === '/') {
      _url = _url.slice(0, -1);
    }

    // youtube.com/watch?v=VIDEO
    if (_url.match(/(youtube\.com\/watch\?v=\w+)/)) {
      _iframe_src = 'https://www.youtube.com/embed/' + getParams(_url).v;

    // youtu.be/VIDEO
    } else if (_url.match(/(youtu\.be\/\w+)/)) {
      _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\/]+$/)[0];

    // vimeo.com/VIDEO
    } else if (_url.match(/(vimeo\.com\/\w+)/)) {
      _iframe_src = 'https://player.vimeo.com/video/' + _url.match(/[^\/]+$/)[0] + '?portrait=0';

    // facebook.com/USER/videos/VIDEO
    } else if (_url.match(/(facebook\.com\/\w+\/videos\/\w+)/)) {
      _iframe_src = 'https://www.facebook.com/v2.8/plugins/video.php?href=' + win.encodeURIComponent(_url);

    // twitch.tv/USER/v/VIDEO
    } else if (_url.match(/(twitch\.tv\/\w+\/v\/\w+)/)) {
      _iframe_src = 'https://player.twitch.tv/?video=v' + _url.match(/[^\/]+$/)[0];

    // twitch.tv/USER
    } else if (_url.match(/(twitch\.tv\/\w+)/)) {
      _iframe_src = 'https://player.twitch.tv/?channel=' + _url.match(/[^\/]+$/)[0];

    // vine.co/v/VIDEO
    } else if (_url.match(/(vine\.co\/v\/\w+)/)) {
      _iframe_src = _url + '/embed/postcard';

    // api.soundcloud.com/tracks/AUDIO
    } else if (_url.match(/(api.soundcloud.com\/tracks\/\w+)/)) {
      _iframe_src = 'https://w.soundcloud.com/player/?url=' + win.encodeURIComponent(_url) + '&auto_play=false&show_artwork=true&color=0066cc';

    // youtube raw embed url
    } else if (_url.match(/(youtube\.com\/embed\/\w+)/)) {
      _iframe_src = _url;

    }

    return _iframe_src;
  }

  function getParams (str) {
    var query_string = '';
    var pairs = [];
    var params = {};
    var i;

    if (typeof str !== 'string' || !str) {
      return;
    }

    query_string = str.replace(/.*?\?/,'') || '';

    if (query_string.length) {
      pairs = query_string.split('&');
      for (i in pairs) {
        var key = pairs[i].split('=')[0];
        if (!key.length) {
          continue;
        }
        if (typeof params[key] === 'undefined') {
          params[key] = [];
        }
        params[key].push(pairs[i].split('=')[1]);
      }
    }
    return params;
  }

  function makeInlineFrame (url, to_replace) {
    // create a div with 16:9 aspect ratio (responsive) and iframe positioned absolute within
    var _16x9_div = doc.createElement('div');
    var _iframe = doc.createElement('iframe');

    _16x9_div.setAttribute('style', 'position:relative;padding-bottom:56.2%;overflow:hidden;');
    _16x9_div.appendChild(_iframe);

    _iframe.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;overflow:hidden;');
    _iframe.setAttribute('allowtransparency', 'true');
    _iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    _iframe.setAttribute('frameborder', 'no');
    _iframe.setAttribute('scrolling', 'no');
    _iframe.src = url;

    if ('allowFullscreen' in _iframe) {
      _iframe.setAttribute('allowFullscreen', 'allowFullscreen');
    }

    if (to_replace && to_replace.nodeType === 1) {
      to_replace.parentNode.replaceChild(_16x9_div, to_replace);
    }
  }

  function isInViewport (el) {
    var r = el.getBoundingClientRect();
    return r.top >= 0 && r.left >= 0 && r.top <= (win.innerHeight || doc.documentElement.clientHeight);
  }

  function debounce (f, wait) {
    var scheduled, args, context, timestamp;
    return function () {
      context = this;
      args = [];
      timestamp = win.performance.now;

      for (var i = 0; i < arguments.length; ++i){
        args[i] = arguments[i];
      }

      function later () {
        var last = win.performance.now - timestamp;
        if (last < wait) {
          scheduled = win.setTimeout(later, wait - last);
        } else {
          scheduled = null;
          f.apply(context, args);
        }
      }
      if (!scheduled) {
       scheduled = win.setTimeout(later, wait);
      }
    }
  }

})(window, window.document);
