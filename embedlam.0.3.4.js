/* embedlam.js @ 0.3.4 :: BSD-3-Clause-Clear :: https://github.com/wnda/embedlam/ */
;(function (win, doc) {

  'use strict';

  var _anchors, _config, _checker;

  if (!('performance' in win)) {
    win.performance = {
      'now': function () { return new win.Date().getTime(); }
    };
  }

  if (!('encodeURIComponent' in win)) {
    win.encodeURIComponent = win.escape;
    win.decodeURIComponent = win.unescape;
  }

  win.embedlam = {
    'init': init
  };

  function init (config) {
    (doc.head || doc.getElementsByTagName('head')[0]).insertAdjacentHTML('beforeend',win.decodeURIComponent('%3Cstyle%3E%5Bdata-mbdlm-4by1%5D%7Bposition%3Arelative!important%3Bpadding-bottom%3A22%25!important%3Boverflow%3Ahidden%3Bbackground-color%3A%23444%3B%7D%5Bdata-mbdlm-16by9%5D%7Bdisplay%3Ablock%3B-webkit-box-sizing%3Aborder-box%3Bbox-sizing%3Aborder-box%3Bposition%3Arelative!important%3Bpadding-bottom%3A56.2%25!important%3Boverflow%3Ahidden%3Bbackground-color%3A%23444%3B%7D%5Bdata-mbdlm-16by9%5D%3Abefore%2C%5Bdata-mbdlm-4by1%5D%3Abefore%7Bcontent%3A%22%22%3B-webkit-box-sizing%3Aborder-box%3Bbox-sizing%3Aborder-box%3Bdisplay%3Ablock%3Bposition%3Aabsolute%3Btop%3A0%3Bleft%3A0%3Bright%3A0%3Bbottom%3A0%3Bwidth%3A100%25%3Bheight%3A100%25%3Bbackground%3Argba(0%2C0%2C0%2C.8)%7D%5Bdata-mbdlm-16by9%5D%3Aafter%2C%5Bdata-mbdlm-4by1%5D%3Aafter%7Bcontent%3A%22%22%3Bdisplay%3Anone%3B-webkit-box-sizing%3Aborder-box%3Bbox-sizing%3Aborder-box%3Bbackground-clip%3Apadding-box%3Bposition%3Aabsolute%3Btop%3A50%25%3Bleft%3A50%25%3Bmargin%3A-48px%200%200%20-48px%3Bopacity%3A1%3Bborder%3A48px%20solid%20transparent%3Bborder-top-color%3A%23fefefe%3Bwidth%3A48px%3Bheight%3A48px%3Bborder-radius%3A48px%3B-webkit-transform%3Arotate(0)%3Btransform%3Arotate(0)%3B%7D%5Bdata-mbdlm-16by9%5D%3Abefore%2C%5Bdata-mbdlm-4by1%5D%3Abefore%2C%5Bdata-mbdlm-16by9%5D%3Aafter%2C%5Bdata-mbdlm-4by1%5D%3Aafter%7Bz-index%3A9999%3B-webkit-pointer-events%3Anone%3Bpointer-events%3Anone%3Bcontain%3Astrict%3Bisolation%3Aisolate%3B%7D%5Bdata-mbdlm-16by9%5D%3Abefore%2C%5Bdata-mbdlm-4by1%5D%3Abefore%7Bopacity%3A0%3Bvisibility%3Bhidden%3Btransition-property%3Aopacity%2Cvisibility%3Btransition-timing-function%3Acubic-bezier(.4%2C0%2C.2%2C1)%3Btransition-duration%3A200ms%3B%7D%5Bdata-mbdlm-16by9%5D%5Bdata-mbdlm-fetching%5D%3Aafter%2C%5Bdata-mbdlm-4by1%5D%5Bdata-mbdlm-fetching%5D%3Aafter%7Bdisplay%3Ablock%3B-webkit-animation%3Aspinner%201s%20cubic-bezier(.4%2C0%2C.2%2C1)%20infinite%3Banimation%3Aspinner%201s%20cubic-bezier(.4%2C0%2C.2%2C1)%20infinite%3B%7D%5Bdata-mbdlm-16by9%5D%5Bdata-mbdlm-fetching%5D%3Abefore%2C%5Bdata-mbdlm-4by1%5D%5Bdata-mbdlm-fetching%5D%3Abefore%7Bopacity%3A1%3Bvisibility%3Avisible%3B%7D%5Bdata-mbdlm-fill%5D%7Bposition%3Aabsolute%3Btop%3A0%3Bleft%3A0%3Bright%3A0%3Bbottom%3A0%3Bwidth%3A100%25%3Bheight%3A100%25%3Boverflow%3Ahidden%3B%7D%5Bdata-mbdlm-img%5D%7Bposition%3Aabsolute%3Btop%3A50%25%3Bleft%3A50%25%3B-webkit-transform%3Atranslate(-50%25%2C-50%25)%3Btransform%3Atranslate(-50%25%2C-50%25)%3Bmin-width%3A100%25%3Bmin-height%3A100%25%3Bwidth%3Aauto%3Bheight%3Aauto%3Bcursor%3Apointer%3B%7D%40-webkit-keyframes%20spinner%7B100%25%7B-webkit-transform%3Arotate(360deg)%7D%7D%40keyframes%20spinner%7B100%25%7Btransform%3Arotate(360deg)%7D%7D%3C%2Fstyle%3E'));
    _anchors = doc.getElementsByTagName('a');
    _config = typeof config !== 'undefined' ? config : null;
    _checker = checkDOM();
    checkDOM();
    addEvent(doc, 'readystatechange', _checker);
    addEvent(win, 'scroll', _checker);
  }

  function checkDOM () {
    return debounce(function (e) {
      var _iframe_src = '';
      var f = 0;
      var g = 0;
      var _ev = null;

      if (!!_config && 'querySelectorAll' in doc) {
        _anchors = ('container' in _config && !!_config.container ? doc.querySelector(_config.container) : doc).querySelectorAll('selector' in _config && !!_config.selector ? _config.selector : 'a');
      }
      f = _anchors.length;
      g = 0;
      _ev = (e || win.event);

      if (doc.readyState === 'loading') {
        return;
      }

      if (typeof _ev !== 'undefined' && !!_ev.type) {
        if (_ev.type !== 'scroll' && _ev.type !== 'onscroll' && (doc.readyState === 'interactive' || doc.readyState === 'complete')) {
          removeEvent(doc, 'readystatechange', _checker);
        }
        if ((_ev.type === 'scroll' || _ev.type === 'onscroll') && f < 1) {
          removeEvent(win, 'scroll', _checker);
          return;
        }
      }

      for (; g < f; ++g) {
        _iframe_src = '';

        if (typeof _anchors[g] === 'undefined' || !_anchors[g].getAttribute('href') || _anchors[g].getAttribute('href').length < 5 || !isInViewport(_anchors[g])) {
          continue;
        }

        _iframe_src = processURL(_anchors[g]);

        if (typeof _iframe_src === 'string' && _iframe_src.length > 0) {
          makeInlineFrame(_iframe_src, _anchors[g], true);
        }
      }
    }, 500);
  }

  function processURL (_link) {
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
        
      case !!(_url.match(/spotify\.com\/\w+/)):
        _iframe_src = 'https://embed.spotify.com/?uri=' + win.encodeURIComponent(_url.replace('https://',''));
        break;

      case !!(_url.match(/vine\.co\/v\/\w+/)):
        _iframe_src = _url + '/embed/postcard';
        break;

      case !!(_url.match(/api\.soundcloud\.com\/tracks\/\w+/)):
        _iframe_src = 'https://w.soundcloud.com/player/?url=' + win.encodeURIComponent(_url) + '&auto_play=false&show_artwork=true&color=0066cc';
        break;

      case !!(_url.match(/instagram\.com\/p\/\w+/)):
        _iframe_src = 'https://' + _url.match(/instagram\.com\/p\/\w+/)[0] + '/embed';
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
      
      case !!(_url.match(/appear\.in\/\w+/)):
        _iframe_src = _url;
        break;

      case !!(_url.match(/google\..*@[^A-Za-z]+,/)):
        makeStaticMap(_url, _link);
        break;

      case !!(_url.match(/vk\.com\/video\?\w+/) && !!_supports_cors):
        _params = getParams(a).z[0].match(/[^video]+$/)[0].split('_');
        _link.setAttribute('href', '#');
        _link.className = 'fetching';
        embedVK(_params, _link);
        break;

      case !!(_url.match(/vk\.com\/video-\w+/) && !!_supports_cors):
        _params = _url.match(/[^\/]+$/)[0].match(/[^video]+$/)[0].split('_');
        _link.setAttribute('href', '#');
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
    var _xhr = 'XDomainRequest' in win ?
      new win.XDomainRequest() : 'XMLHttpRequest' in win ?
        new win.XMLHttpRequest() : {};
    var _hdrs;

    if ('fetch' in win) {
      _hdrs = new win.Headers({
         'X-Requested-With': 'XMLHttpRequest'
      });
      win.fetch(_vk_url, {'method': 'GET', 'mode': 'cors', 'headers': _hdrs}).then(function (resp) {
        if (!!resp.ok) {
          return resp.text().then(function (resptxt) {
            return makeInlineFrame(getVKHash(resptxt, _params), _link, false);
          }).catch(function (e) {
            win.console.warn(e);
            _link.insertAdjacentHTML('beforeend', '<span> [Attempt to embed failed: ' + _vk_url + ']</span>');
          });
        }
      }).catch(function (e) {
        win.console.warn(e);
        _link.insertAdjacentHTML('beforeend', '<span> [Attempt to embed failed: ' + _vk_url + ']</span>');
      });

    } else {
      _xhr.open('GET', _vk_url, true);
      _xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      _xhr.responseType = 'text';
      addEvent(_xhr, 'readystatechange', function (e) {
        var _evt = (e.target || this);
        if (_evt.readyState === 4 && _evt.status > 199 && _evt.status < 300) {
          return makeInlineFrame(getVKHash(_evt.responseText, _params), _link, false);
        }
      });
      addEvent(_xhr, 'error', function () {
        _link.insertAdjacentHTML('beforeend', '<span> [Attempt to embed failed: ' + _vk_url + ']</span>');
      });
      win.setTimeout(function () {
        _xhr.send(null);
      }, 0);
    }
  }

  function getVKHash(markup, params) {
    return 'https://vk.com/video_ext.php?oid=' + params[0] + '&id=' + params[1] + '&hash=' + (markup.match(/hash[^0-9a-f]*([0-9a-f]*)/)[1])  + '&hd=1';
  }

  function makeInlineFrame (url, to_replace, sandbox) {
    var _16x9_div;
    var _iframe;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = createPlaceholder('16by9');
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);

    _iframe = doc.createElement('iframe');
    _16x9_div.appendChild(_iframe);
    addEvent(_iframe, 'load', fetchFinished);

    _iframe.setAttribute('data-mbdlm-fill', '');
    _iframe.setAttribute('allowtransparency', 'true');
    _iframe.setAttribute('frameborder', 'no');
    _iframe.setAttribute('scrolling', 'no');
    _iframe.setAttribute('referrerpolicy', 'no-referrer');
    _iframe.src = url;

    if (!!sandbox) {
      _iframe.setAttribute('sandbox', 'allow-scripts allow-presentation allow-same-origin allow-orientation-lock');
    }

    if ('allowFullscreen' in _iframe) {
      _iframe.setAttribute('allowFullscreen', 'allowFullscreen');
    }
  }

  function makeDownload(url, to_replace) {
    var _4x1_div;
    var _dl;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _4x1_div = createPlaceholder('4by1');
    to_replace.parentNode.replaceChild(_4x1_div, to_replace);

    _dl = doc.createElement('div');
    _4x1_div.appendChild(_dl);
    addEvent(_dl, 'load', fetchFinished);

    _4x1_div.setAttribute('data-mbdlm-fill', '');
    _dl.setAttribute('data-mbdlm-url', win.encodeURIComponent(url));
    addEvent(_dl, 'click', fakeLink);
  }

  function makeImage (url, to_replace) {
    var _16x9_div;
    var _img;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = createPlaceholder('16by9');
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);

    _img = doc.createElement('img');
    _16x9_div.appendChild(_img);
    addEvent(_img, 'load', fetchFinished);

    _img.setAttribute('data-mbdlm-img', '');
    _img.src = url;
    _img.alt = to_replace.textContent ? to_replace.textContent : url;
    _img.title = to_replace.textContent ? to_replace.textContent : url;
    _img.setAttribute('data-mbdlm-url', win.encodeURIComponent(url));
    addEvent(_img, 'click', fakeLink);
  }

  function makeVideo (url, to_replace, type) {
    var _16x9_div;
    var _video;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = createPlaceholder('16by9');
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);

    _video = doc.createElement('video');
    _16x9_div.appendChild(_video);
    addEvent(_video, 'canplay', fetchFinished);

    _video.setAttribute('data-mbdlm-fill', '');
    _video.setAttribute('controls', '');
    _video.setAttribute('muted', '');
    _video.setAttribute('webkitplaysinline', '');
    _video.setAttribute('playsinline', '');
    _video.insertAdjacentHTML('afterBegin', '<source src="' + url + '" type="video/' + type + '"></source>');

  }

  function makeAudio (url, to_replace, type) {
    var _4x1_div;
    var _audio;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _4x1_div = createPlaceholder('4by1');
    to_replace.parentNode.replaceChild(_4x1_div, to_replace);

    _audio = doc.createElement('audio');
    _4x1_div.appendChild(_audio);
    addEvent(_audio, 'canplay', fetchFinished);

    _audio.setAttribute('data-mbdlm-fill', '');
    _audio.setAttribute('controls', 'controls');
    _audio.setAttribute('muted', 'muted');
    _audio.insertAdjacentHTML('afterBegin', '<source src="' + url + '" type="audio/' + type + '"></source>');
  }

  function makeStaticMap (url, to_replace) {
    var _16x9_div;
    var _img;
    var _latlang;
    var _cW, _cH;
    var _z;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = createPlaceholder('16by9');
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);

    _img = doc.createElement('img');
    _16x9_div.appendChild(_img);
    addEvent(_img, 'load', fetchFinished);

    _latlang = url.match(/@([^A-Za-z]+,)/)[0].slice(0,-1).replace('@', '');
    _img.setAttribute('data-mbdlm-img', '');

    _cW = _16x9_div.clientWidth > 1 ? _16x9_div.clientWidth : '1';
    _cH = _16x9_div.clientHeight > 1 ? _16x9_div.clientHeight : '1';
    _z  = +(url.match(/(,\d+\.\d+z)|(,\d+z)/)[0].replace(',', '').replace('z', ''));

    _img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
               _latlang + '&size=' + _cW + 'x' +
               _cH + '&sensor=false&maptype=roadmap&zoom=' +
               ((_z >= 12 ? _z - 3 : _z) | 0) +
               '&markers=' + _latlang + '&key=AIzaSyAf7V-aqUb-Guull54mvfrH61hFUbNPqvM';

    _img.alt = 'Google Map';
    _img.title = 'Google Map: ' + _latlang;
    _img.setAttribute('data-mbdlm-url', win.encodeURIComponent(url));
    addEvent(_img, 'click', fakeLink);
  }

  function createPlaceholder (aspect_ratio) {
    var _el = doc.createElement('div');
    _el.setAttribute('data-mbdlm-' + aspect_ratio, '');
    _el.setAttribute('data-mbdlm-fetching', '');
    return _el;
  }

  function fetchFinished (e) {
    var _ev = (e || win.event || null);
    var _evt;
    if (typeof _ev === 'undefined' || !_ev) {
      return;
    }
    _evt = (_ev.currentTarget || _ev.srcElement || null);
    if (!!_evt) {
      _evt.parentNode.removeAttribute('data-mbdlm-fetching');
      removeEvent(_evt, _ev.type, fetchFinished);
    }
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

  function addEvent (target, type, handler) {
    switch (true) {
      case ('addEventListener' in win):
        return target.addEventListener(type, handler, false);
      case ('attachEvent' in win):
        return target.attachEvent(type, handler);
      default:
        target['on' + type] = handler;
    }
  }

  function removeEvent (target, type, handler) {
    switch (true) {
      case ('removeEventListener' in win):
        return target.removeEventListener(type, handler, false);
      case ('detachEvent' in win):
        return target.detachEvent(type, handler);
      default:
        target['on' + type] = null;
    }
  }

  function fakeLink (e) {
    var _ev = (e || win.event || null);
    var _evt;
    if (typeof _ev === 'undefined' || !_ev) {
      return;
    }
    _evt = (_ev.currentTarget || _ev.srcElement || null);
    if (!('getAttribute' in _evt)) { return; }
    return win.open(win.decodeURIComponent(_evt.getAttribute('data-mbdlm-url')));
  }

})(window, window.document);
