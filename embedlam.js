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

      iframe_src = processUrl(link);

      if (typeof iframe_src === 'string' && iframe_src.length > 0) {
        makeInlineFrame(iframe_src, link, true);
      }
    });
  }

  function processUrl (_link) {
    var _url = _link.href;
    var _by_dot = _url.split('.');
    var _iframe_src;
    var _params;

    // rewrite urls to use https
    _url = _url.match(/http:/) ? _url.replace('http:', 'https:') : _url;

    // chop off trailing slash
    _url = _url.slice(-1) === '/' ? _url.slice(0, -1) : _url;

    switch (true) {

      case !!(_url.match(/(\.mp4|\.webm)/)):
        if ('HTMLVideoElement' in win) {
          _len = _by_dot.length;
          if (_by_dot[_len - 1] === 'mp4' || _by_dot[_len - 1] === 'webm') {
            makeVideo(_url, _link);
          }
        }
        break;

      case !!(_url.match(/(youtube\.com\/embed\/\w+)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(youtube\.com\/watch\?v=\w+)/)):
        _iframe_src = 'https://www.youtube.com/embed/' + getParams(_url).v;
        break;

      case !!(_url.match(/(youtu\.be\/\w+)/)):
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/([^\/]+$)/)[0];
        break;

      case !!(_url.match(/(youtube\.com\/v\/\w+)/)):
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/([^\/]+$)/)[0];
        break;

      case !!(_url.match(/(youtube\.com\/playlist\?list=\w+)/)):
        _iframe_src = 'https://www.youtube.com/embed/videoseries?list=' + getParams(_url).list;
        break;

      case !!(_url.match(/(player\.vimeo\.com\/video\/\w+)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(vimeo\.com\/\w+)/)):
        _iframe_src = 'https://player.vimeo.com/video/' + _url.match(/([^\/]+$)/)[0] + '?portrait=0';
        break;

      case !!(_url.match(/(facebook\.com\/\w+\/videos\/\w+)/)):
        _iframe_src = 'https://www.facebook.com/v2.8/plugins/video.php?href=' + win.encodeURIComponent(_url);
        break;

      case !!(_url.match(/(twitch\.tv\/\w+\/v\/\w+)/)):
        _iframe_src = 'https://player.twitch.tv/?video=v' + _url.match(/([^\/]+$)/)[0];
        break;

      case !!(_url.match(/(twitch\.tv\/\w+)/)):
        _iframe_src = 'https://player.twitch.tv/?channel=' + _url.match(/([^\/]+$)/)[0];
        break;

      case !!(_url.match(/(dailymotion\.com\/embed\/video\/\w+)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(dailymotion\.com\/video\/\w+)/)):
        _iframe_src = 'https://www.dailymotion.com/embed/video/' + _url.match(/([^\/]+$)/)[0].split('_')[0];
        break;

      case !!(_url.match(/(bandcamp\.com\/EmbeddedPlayer\/\w+)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(open\.spotify\.com\/embed\?\w+)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(embed\.spotify\.com\/\?\w+)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(spotify\.com\/user\/\w+\/playlist\/\w+)/)):
        _iframe_src = 'https://embed.spotify.com/?uri=spotify:user:' + (_url.split('/')[0] !== 'https:' ? _url.split('/')[2] : _url.split('/')[4]) + '/playlist/' + _url.match(/([^\/]+$)/)[0];
        break;

      case !!(_url.match(/(spotify\.com\/track\/\w+)/)):
        _iframe_src = 'https://embed.spotify.com/?uri=spotify:track:' + _url.match(/([^\/]+$)/)[0];
        break;

      case !!(_url.match(/(vine\.co\/v\/\w+)/)):
        _iframe_src = _url + '/embed/postcard';
        break;

      case !!(_url.match(/(api\.soundcloud\.com\/tracks\/\w+)/)):
        _iframe_src = 'https://w.soundcloud.com/player/?url=' + win.encodeURIComponent(_url) + '&auto_play=false&show_artwork=true&color=0066cc';
        break;

      case !!(_url.match(/(imgur\.com\/\/a\/\w+\/embed\?)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(imgur\.com\/\w+\/embed\?)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(imgur\.com\/gallery\/\w+)/)):
        _iframe_src = 'https://imgur.com/a/' + _url.match(/([^\/]+$)/)[0] + '/embed?pub=true&analytics=false'
        break;

      case !!(_url.match(/(imgur\.com\/a\/\w+)/)):
        _iframe_src = _url + '/embed?pub=true&analytics=false';
        break;

      case !!(_url.match(/(gfycat\.com\/ifr\/\w+)/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/(vk\.com\/video\?\w+)/)):
        if ('fetch' in win || 'XMLHttpRequest' in win || 'XDomainRequest' in win) {
          _params = getParams(a).z[0].match(/([^video]+$)/)[0].split('_');
          _link.href = '#';
          _link.className = 'fetching';
          embedVK(_params, _link);
        }
        break;

      case !!(_url.match(/(vk\.com\/video-\w+)/)):
        if ('fetch' in win || 'XMLHttpRequest' in win || 'XDomainRequest' in win) {
          _params = _url.match(/([^\/]+$)/)[0].match(/([^video]+$)/)[0].split('_');
          _link.href = '#';
          _link.className = 'fetching';
          embedVK(_params, _link);
        }
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


  function embedVK (_params, _link) {
    var _proxy = 'https://cors-anywhere.herokuapp.com/';
    var _vk_url = _proxy + 'https://vk.com/video' + _params[0] + '_' + _params[1];
    var _xhr = new XMLHttpRequest();
    var _xdr;

    if ('fetch' in win) {

      win.fetch(_vk_url, {
        'mode': 'cors'
      }).then(function (resp) {
        return resp.text().then(function (resptxt) {
          var _hash = resptxt.match(/hash2[^0-9a-f]*([0-9a-f]*)/)[1];
          var _vk_embed = 'https://vk.com/video_ext.php?oid=' + _params[0] + '&id=' + _params[1] + '&hash=' + _hash  + '&hd=1';
          return makeInlineFrame(_vk_embed, _link, false);
        }).catch(function (e) {
          _link.href = _vk_url;
          _link.insertAdjacentHTML('beforeEnd', '<span> [Attempt to embed failed]</span>');
        });
      }).catch(function (e) {
        _link.href = _vk_url;
        _link.insertAdjacentHTML('beforeEnd', '<span> [Attempt to embed failed]</span>');
      });

    } else if ('XMLHttpRequest' in win && 'withCredentials' in _xhr) {

      _xhr.open('GET', _vk_url, true);
      _xhr.responseType = 'text';

      _xhr.onreadystatechange = function () {
        if (_xhr.readyState === 4 && _xhr.status >= 200 && _xhr.status < 300) {
          var _hash = _xhr.responseText.match(/hash2[^0-9a-f]*([0-9a-f]*)/)[1];
          var _vk_embed = 'https://vk.com/video_ext.php?oid=' + _params[0] + '&id=' + _params[1] + '&hash=' + _hash  + '&hd=1';
          return makeInlineFrame(_vk_embed, _link, false);
        }
      };

      _xhr.onerror = _xhr.ontimeout = _xhr.onabort = function () {
        _link.href = _vk_url;
        _link.insertAdjacentHTML('beforeEnd', '<span> [Attempt to embed failed]</span>');
      };

      _xhr.send(null);

    } else {

      _xdr = new XDomainRequest();
      _xdr.open('GET', _vk_url);

      _xdr.onload = function () {
        var _hash = _xdr.responseText.match(/hash2[^0-9a-f]*([0-9a-f]*)/)[1];
        var _vk_embed = 'https://vk.com/video_ext.php?oid=' + _params[0] + '&id=' + _params[1] + '&hash=' + _hash  + '&hd=1';
        return makeInlineFrame(_vk_embed, _link, false);
      };

      _xdr.onerror = _xdr.ontimeout = function () {
        _link.href = _vk_url;
        _link.insertAdjacentHTML('beforeEnd', '<span> [Attempt to embed failed]</span>');
      };

      win.setTimeout(function () {
        _xdr.send();
      }, 0);

    }
  }

  function makeVideo (url, to_replace) {
    var _16x9_div = doc.createElement('div');
    var _video = doc.createElement('video');

    _16x9_div.setAttribute('style', 'position:relative;padding-bottom:56.2%;overflow:hidden;background-color:#444;');
    _16x9_div.appendChild(_video);
    _video.setAttribute('style', 'position:absolute;top:0;left:auto;right:auto;bottom:0;margin:0 auto;width:auto;height:100%;overflow:hidden;');
    _video.setAttribute('controls', 'controls');
    _video.setAttribute('muted', 'muted');
    _video.setAttribute('crossorigin', 'anonymous');
    _video.setAttribute('webkitplaysinline', 'webkitplaysinline');
    _video.setAttribute('playsinline', 'playsinline');
    _video.setAttribute('src', url);

    if (to_replace && to_replace.nodeType === 1) {
      to_replace.parentNode.replaceChild(_16x9_div, to_replace);
    }
  }

  function makeInlineFrame (url, to_replace, sandbox) {
    // create a div with 16:9 aspect ratio (responsive) and iframe positioned absolute within
    var _16x9_div = doc.createElement('div');
    var _iframe = doc.createElement('iframe');

    _16x9_div.setAttribute('style', 'position:relative;padding-bottom:56.2%;overflow:hidden;background-color:#444;');
    _16x9_div.appendChild(_iframe);
    _iframe.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;overflow:hidden;');
    _iframe.setAttribute('allowtransparency', 'true');
    _iframe.setAttribute('frameborder', 'no');
    _iframe.setAttribute('scrolling', 'no');
    _iframe.src = url;

    if (!!sandbox) {
      _iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    }

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
