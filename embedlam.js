;(function (win, doc) {

  if ( !('performance' in win) ) {
    win.performance = {
      'now': function () { return new win.Date().getTime() }
    };
  }

  // initial check
  checkDocument();

  // subsequent checks
  win.addEventListener('scroll', debounce(checkDocument, 100), false);

  function checkDocument () {
    var nodes = [].slice.call(doc.getElementsByTagName('a'));

    nodes.forEach(function (link) {
      var iframe_src = '';
      var vid_query_string = '';

      if (typeof link.href === 'undefined' || link.href.length < 5 || !isInViewport(link)) {
        return;
      }

      iframe_src = processUrl(link.href);

      if (typeof iframe_src === 'string' && iframe_src.length > 0) {
        makeInlineFrame(iframe_src, link);
      }
    });
  }

  function processUrl (_url) {
    var _iframe_src;
    var _params;
    var _hash;

    // rewrite urls to use https
    _url = _url.match(/http:/) ? _url.replace('http:', 'https:') : _url;

    // chop off trailing slash
    _url = _url.slice(-1) === '/' ? _url.slice(0, -1) : _url;

    /*
      dailymotion
      animoto
      soundcloud
      youtube playlist
      mixcloud
      rdio
      spotify
      soundcloud playlist
      flickr
    */
    switch (true) {
      case !!(_url.match(/(youtube\.com\/watch\?v=\w+)/)):
        _iframe_src = 'https://www.youtube.com/embed/' + getParams(_url).v;
        break;

      case !!(_url.match(/(youtu\.be\/\w+)/)):
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/(youtube\.com\/playlist\?list=\w+)/)):
        _iframe_src = 'https://www.youtube.com/embed/videoseries?list=' + getParems(_url).list;
        break;

      case !!(_url.match(/(vimeo\.com\/\w+)/)):
        _iframe_src = 'https://player.vimeo.com/video/' + _url.match(/[^\/]+$/)[0] + '?portrait=0';
        break;

      case !!(_url.match(/(facebook\.com\/\w+\/videos\/\w+)/)):
        _iframe_src = 'https://www.facebook.com/v2.8/plugins/video.php?href=' + win.encodeURIComponent(_url);
        break;

      case !!(_url.match(/(twitch\.tv\/\w+\/v\/\w+)/)):
        _iframe_src = 'https://player.twitch.tv/?video=v' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/(twitch\.tv\/\w+)/)):
        _iframe_src = 'https://player.twitch.tv/?channel=' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(url.match(/(dailymotion\.com\/video\/\w+)/)):
        _iframe_src = 'https://www.dailymotion.com/embed/video/' + _url.match(/([^\/]+$)/)[0].split('_')[0];
        break;
      case !!(url.match(/(dailymotion\.com\/embed\/video\/\w+)/)):
        _iframe_src = _url;
        break;
/*
      case !!(_url.match(/(vk\.com\/video\?\w+)/)):
        _params = getParams(a).z[0].match(/[^video]+$/)[0].split('_');
        _hash = getVKHash(_params);
        _iframe_src = 'http://vk.com/video_ext.php?oid=' + _params[0] + '&id=' + _params[1] + '&hash=' + _hash + '&hd=1';
        break;

      case !!(_url.match(/(vk\.com\/video-\w+)/)):
        _params = _url.match(/[^\/]+$/)[0].split('_');
        _hash = getVKHash(_params);
        _iframe_src = 'http://vk.com/video_ext.php?oid=' + _params[0] + '&id=' + _params[1] + '&hash=' + _hash + '&hd=1';
        break;
*/
      case !!(_url.match(/(vine\.co\/v\/\w+)/)):
        _iframe_src = _url + '/embed/postcard';
        break;

      case !!(_url.match(/(api\.soundcloud\.com\/tracks\/\w+)/)):
        _iframe_src = 'https://w.soundcloud.com/player/?url=' + win.encodeURIComponent(_url) + '&auto_play=false&show_artwork=true&color=0066cc';
        break;

      case !!(_url.match(/(youtube\.com\/embed\/\w+)/)):
        _iframe_src = _url;
        break;

      default:
        _iframe_src = '';
    }

    return _iframe_src;
  }

  function getParams (str) {
    var query_string = '';
    var pairs = [];
    var params = {};
    var i;

    if (typeof str !== 'string' || !str) return;

    query_string = str.replace(/.*?\?/, '') || '';

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

/*
  function getVKHash (_params) {
    var _vk_url = 'https://vk.com/video' + _params[0] + '_' + _params[1];
    return win.fetch('https://crossorigin.me/' + _vk_url)
      .then(function(resp){
        return resp.text()
          .then(function(resptxt){
            return resptxt.match(/hash2[^0-9a-f]*([0-9a-f]*)/)[1]
          })
      });
  }
*/

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
    return (r.top >= 0 && r.left >= 0 && r.top <= (win.innerHeight || doc.documentElement.clientHeight));
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

      if (!scheduled) {
       scheduled = win.setTimeout(later, wait);
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
    }
  }

})(window, window.document);
