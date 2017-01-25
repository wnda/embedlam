;(function (win, doc) {

  'use strict';

  if (!('performance' in win)) {
    win.performance = {
      'now': function () { return new win.Date().getTime(); }
    };
  }

  if (!('encodeURIComponent' in win)) {
    win.encodeURIComponent = win.escape;
    win.decodeURIComponent = win.unescape;
  }

  var _anchors, _config, _checker;

  win.embedlam = {
    'init': init
  };

  function init (config) {
    _anchors = doc.getElementsByTagName('a');
    _config = typeof config !== 'undefined' ? config : null;
    _checker = checkDOM();
    addEvent(win, 'load', _checker);
    addEvent(win, 'scroll', _checker);
  }

  function checkDOM () {
    return debounce(function (e) {
      var iframe_src = '';
      var f = 0;
      var g = 0;

      if (!!_config && 'querySelectorAll' in doc) {
        _anchors = 
          ('container' in _config && !!_config.container ? doc.querySelector(_config.container) : doc)
              .querySelectorAll('selector' in _config && !!_config.selector ? _config.selector : 'a');
      }

      f = _anchors.length;
      g = 0;

      if (typeof e === 'object' && !!e && 'type' in e && !!e.type) {
        if (e.type === 'load') {
          removeEvent(win, 'load', _checker);
        }
        if (e.type === 'scroll' && f < 1) {
          removeEvent(win, 'scroll', _checker);
        }
      }

      for (; g < f; ++g) {
        iframe_src = '';

        if (typeof _anchors[g] === 'undefined' || !_anchors[g].getAttribute('href') || _anchors[g].getAttribute('href').length < 5 || !isInViewport(_anchors[g])) {
          continue;
        }

        iframe_src = processUrl(_anchors[g]);

        if (typeof iframe_src === 'string' && iframe_src.length > 0) {
          makeInlineFrame(iframe_src, _anchors[g], true);
        }
      }
    }, 500);
  }

  function processUrl (_link) {
    var _supports_cors = ('fetch' in win || 'XDomainRequest' in win || 'XMLHttpRequest' in win);
    var _url = _link.href || _link.getAttribute('href');
    var _by_dot;
    var _len;
    var _params;
    var _iframe_src;

    _url = _url.match(/http:/) ? _url.replace('http:', 'https:') : _url;
    _url = _url.slice(-1) === '/' ? _url.slice(0, -1) : _url;
    _by_dot = _url.split('.');
    _len = _by_dot.length;

    switch (true) {
      case !!(_url.match(/\.386|\.bat|\.cmd|\.dll|\.exe|\.msi|\.sh/i)):
        switch (_by_dot[_len - 1].toLowerCase()) {
          case '386':
          case 'bat':
          case 'cmd':
          case 'dll':
          case 'exe':
          case 'msi':
          case 'sh':
            _link.parentNode.removeChild(_link);
            win.console.warn('Link to potentially harmful file removed: ' + _url);
            break;
        }
        break;

      case !!(_link.getAttribute('download')):
        makeDownload(_url, _link);
        break;

      case !!(_url.match(/\.jpg|\.jpeg|\.png|\.apng|\.gif|\.webp|\.bmp|\.ico|\.tiff|\.svg/i)):
        switch (_by_dot[_len - 1].toLowerCase()) {
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'apng':
          case 'gif':
          case 'webp':
          case 'bmp':
          case 'ico':
          case 'tiff':
          case 'svg':
            makeImage(_url, _link);
            break;
        }
        break;

      case !!(_url.match(/\.mp4|\.webm/i) && 'HTMLVideoElement' in win):
        switch (_by_dot[_len - 1].toLowerCase()) {
          case 'mp4':
          case 'webm':
            makeVideo(_url, _link, _by_dot[_len - 1]);
            break;
        }
        break;

      case !!(_url.match(/\.mp3|\.m4a|\.wav/i) && 'HTMLAudioElement' in win):
        switch (_by_dot[_len - 1].toLowerCase()) {
          case 'mp3':
          case 'm4a':
          case 'wav':
            makeAudio(_url, _link, _by_dot[_len - 1]);
            break;
        }
        break;

      case !!(_url.match(/youtube\.com\/embed\/\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/youtube\.com\/watch\?v=\w+/)):
        _iframe_src = 'https://www.youtube.com/embed/' + getParams(_url).v;
        break;

      case !!(_url.match(/youtu\.be\/\w+/)):
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/youtube\.com\/v\/\w+/)):
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/youtube\.com\/playlist\?list=\w+/)):
        _iframe_src = 'https://www.youtube.com/embed/videoseries?list=' + getParams(_url).list;
        break;

      case !!(_url.match(/player\.vimeo\.com\/video\/\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/vimeo\.com\/\w+/)):
        _iframe_src = 'https://player.vimeo.com/video/' + _url.match(/[^\/]+$/)[0] + '?portrait=0';
        break;

      case !!(_url.match(/facebook\.com\/\w+\/videos\/\w+/)):
        _iframe_src = 'https://www.facebook.com/v2.8/plugins/video.php?href=' + win.encodeURIComponent(_url);
        break;

      case !!(_url.match(/player\.twitch\.tv\/\?\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/clips\.twitch\.tv\/embed\?clip/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/twitch\.tv\/\w+\/v\/\w+/)):
        _iframe_src = 'https://player.twitch.tv/?video=v' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/dailymotion\.com\/embed\/video\/\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/dailymotion\.com\/video\/\w+/)):
        _iframe_src = 'https://www.dailymotion.com/embed/video/' + _url.match(/[^\/]+$/)[0].split('_')[0];
        break;

      case !!(_url.match(/bandcamp\.com\/EmbeddedPlayer\/\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/open\.spotify\.com\/embed\?\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/embed\.spotify\.com\/\?\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/spotify\.com\/user\/\w+\/playlist\/\w+/)):
        _iframe_src = 'https://embed.spotify.com/?uri=spotify:user:' + (_url.split('/')[0] !== 'https:' ? _url.split('/')[2] : _url.split('/')[4]) + '/playlist/' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/spotify\.com\/track\/\w+/)):
        _iframe_src = 'https://embed.spotify.com/?uri=spotify:track:' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/vine\.co\/v\/\w+/)):
        _iframe_src = _url + '/embed/postcard';
        break;

      case !!(_url.match(/api\.soundcloud\.com\/tracks\/\w+/)):
        _iframe_src = 'https://w.soundcloud.com/player/?url=' + win.encodeURIComponent(_url) + '&auto_play=false&show_artwork=true&color=0066cc';
        break;

      case !!(_url.match(/imgur\.com\/\/a\/\w+\/embed\?/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/imgur\.com\/\w+\/embed\?/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/imgur\.com\/gallery\/\w+/)):
        _iframe_src = 'https://imgur.com/a/' + _url.match(/[^\/]+$/)[0] + '/embed?pub=true&analytics=false';
        break;

      case !!(_url.match(/imgur\.com\/a\/\w+/)):
        _iframe_src = _url + '/embed?pub=true&analytics=false';
        break;

      case !!(_url.match(/gfycat\.com\/ifr\/\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/gfycat\.com\/([A-Z][a-z]*)([A-Z][a-z]*)([A-Z][a-z]*)/)):
        _iframe_src = 'https://gfycat.com/ifr/' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/hulu\.com\/embed\.html\?\w+=\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/google\..*@[^A-Za-z]+,/)):
        makeStaticMap(_url, _link);
        break;

      case !!(_url.match(/vk\.com\/video\?\w+/) && !!_supports_cors):
        _params = getParams(a).z[0].match(/[^video]+$/)[0].split('_');
        _link.href = '#';
        _link.className = 'fetching';
        embedVK(_params, _link);
        break;

      case !!(_url.match(/vk\.com\/video-\w+/) && !!_supports_cors):
        _params = _url.match(/[^\/]+$/)[0].match(/[^video]+$/)[0].split('_');
        _link.href = '#';
        _link.className = 'fetching';
        embedVK(_params, _link);
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

    if (typeof str !== 'string' || !str) {
      return;
    }

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
    var _proxy = 'https://f0c10a425.herokuapp.com/';
    var _vk_url = _proxy + 'https://vk.com/video' + _params[0] + '_' + _params[1];
    var _xhr = 'XMLHttpRequest' in win ? new win.XMLHttpRequest() : {};
    var _xdr;

    if ('fetch' in win) {
      win.fetch(_vk_url, {'mode': 'cors'}).then(function (resp) {
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
      win.setTimeout(function () {
        _xhr.send(null);
      }, 0);

    } else if ('XDomainRequest' in win) {
      _xdr = new win.XDomainRequest();
      _xdr.open('GET', _vk_url, true);
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

  function makeInlineFrame (url, to_replace, sandbox) {
    var _16x9_div;
    var _iframe;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = doc.createElement('div');
    _iframe = doc.createElement('iframe');
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

    to_replace.parentNode.replaceChild(_16x9_div, to_replace);
  }

  function makeDownload(url, to_replace) {
    var _4x1_div;
    var _dl;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _4x1_div = doc.createElement('div');
    _dl = doc.createElement('div');
    _4x1_div.setAttribute('style', 'position:relative;padding-bottom:22%;overflow:hidden;background-color:#444;cursor:pointer;');
    _4x1_div.appendChild(_dl);
    _4x1_div.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;overflow:hidden;');
    _dl.setAttribute('data-url', win.encodeURIComponent(url));
    to_replace.parentNode.replaceChild(_4x1_div, to_replace);
    addEvent(_dl, 'click', fakeLink);
  }

  function makeImage (url, to_replace) {
    var _16x9_div;
    var _img;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = doc.createElement('div');
    _img = doc.createElement('img');
    _16x9_div.setAttribute('style', 'position:relative;padding-bottom:56.2%;overflow:hidden;background-color:#444;cursor:pointer;');
    _16x9_div.appendChild(_img);

    if ('transform' in _img.style) {
      _img.setAttribute('style', 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;cursor:pointer;');

    } else if ('webkitTransform' in _img.style) {
      _img.setAttribute('style', 'position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;cursor:pointer;');

    } else {
      _img.setAttribute('style', 'width:auto;height:100%;margin:0 auto;cursor:pointer;');
    }

    _img.src = url;
    _img.alt = to_replace.textContent ? to_replace.textContent : url;
    _img.title = to_replace.textContent ? to_replace.textContent : url;
    _img.setAttribute('data-url', win.encodeURIComponent(url));
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);
    addEvent(_img, 'click', fakeLink);
  }

  function makeVideo (url, to_replace, type) {
    var _16x9_div;
    var _video;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = doc.createElement('div');
    _video = doc.createElement('video');
    _16x9_div.setAttribute('style', 'position:relative;padding-bottom:56.2%;overflow:hidden;background-color:#444;');
    _16x9_div.appendChild(_video);
    _video.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;overflow:hidden;');
    _video.setAttribute('controls', 'controls');
    _video.setAttribute('muted', 'muted');
    _video.setAttribute('webkitplaysinline', 'webkitplaysinline');
    _video.setAttribute('playsinline', 'playsinline');
    _video.insertAdjacentHTML('afterBegin', '<source src="' + url + '" type="video/' + type + '"></source>');
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);
  }

  function makeAudio (url, to_replace, type) {
    var _4x1_div;
    var _audio;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _4x1_div = doc.createElement('div');
    _audio = doc.createElement('audio');
    _4x1_div.setAttribute('style', 'position:relative;padding-bottom:22%;overflow:hidden;background-color:#444;');
    _4x1_div.appendChild(_audio);
    _audio.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;overflow:hidden;');
    _audio.setAttribute('controls', 'controls');
    _audio.setAttribute('muted', 'muted');
    _audio.insertAdjacentHTML('afterBegin', '<source src="' + url + '" type="audio/' + type + '"></source>');
    to_replace.parentNode.replaceChild(_4x1_div, to_replace);
  }

  function makeStaticMap (url, to_replace) {
    var _16x9_div;
    var _img;
    var _latlang;
    var _cW, _cH;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = doc.createElement('div');
    _img = doc.createElement('img');
    _latlang = url.match(/@([^A-Za-z]+,)/)[0].slice(0,-1).replace('@', '');
    _16x9_div.setAttribute('style', 'position:relative;padding-bottom:56.2%;overflow:hidden;background-color:#444;cursor:pointer;');

    if ('transform' in _img.style) {
      _img.setAttribute('style', 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;cursor:pointer;');

    } else if ('webkitTransform' in _img.style) {
      _img.setAttribute('style', 'position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;cursor:pointer;');

    } else {
      _img.setAttribute('style', 'width:auto;height:100%;margin:0 auto;cursor:pointer;');
    }

    _16x9_div.appendChild(_img);
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);
    _cW = _16x9_div.clientWidth > 1 ? _16x9_div.clientWidth : '1';
    _cH = _16x9_div.clientHeight > 1 ? _16x9_div.clientHeight : '1';

    _img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
               _latlang + '&size=' + _cW + 'x' +
               _cH + '&sensor=false&maptype=roadmap&zoom=' +
               url.match(/,\d\dz/)[0].replace(',', '').replace('z', '') +
               '&markers=' + _latlang + '&key=AIzaSyAf7V-aqUb-Guull54mvfrH61hFUbNPqvM';

    _img.alt = 'Google Map';
    _img.title = 'Google Map: ' + _latlang;
    _img.setAttribute('data-url', win.encodeURIComponent(url));

    addEvent(_img, 'click', fakeLink);
  }

  function isInViewport (el) {
    var r = el.getBoundingClientRect();
    return (r.top >= 0 && r.left >= 0 && r.top <= (win.innerHeight || doc.documentElement.clientHeight));
  }

  function debounce (func, wait) {
    var scheduled, args, context, timestamp;
    return function () {
      context = this;
      args = [];
      timestamp = win.performance.now;
      for (var i = 0; i < arguments.length; ++i) {
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
          func.apply(context, args);
        }
      }
    };
  }

  function addEvent (w, x, y) {
    switch (true) {
      case ('addEventListener' in win):
        return w.addEventListener(x, y, false);
      case ('attachEvent' in win):
        return w.attachEvent(x, y);
      default:
        w['on' + x] = y;
    }
  }

  function removeEvent (w, x, y) {
    switch (true) {
      case ('removeEventListener' in win):
        return w.removeEventListener(x, y, false);
      case ('detachEvent' in win):
        return w.detachEvent(x, y);
      default:
        w['on' + x] = null;
    }
  }

  function fakeLink (e) {
    var evt = (e.currentTarget || this);
    if (!('getAttribute' in evt)) {
      return;
    }
    return win.open(win.decodeURIComponent(evt.getAttribute('data-url')));
  }

})(window, window.document);
