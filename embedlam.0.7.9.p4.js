/* embedlam.js @ 0.7.9 patch 4 :: BSD-3-Clause-Clear :: https://github.com/wnda/embedlam/ */
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

  win.embedlam = { 'init': init };

  function init (config) {
    (doc.head || doc.getElementsByTagName('head')[0]).insertAdjacentHTML('beforeend',win.decodeURIComponent('%3Cstyle%3E%5Bdata-mbdlm-4by1%5D%2C%5Bdata-mbdlm-16by9%5D%2C%5Bdata-mbdlm-sq%5D%7Bdisplay%3Ablock%3B-webkit-box-sizing%3Aborder-box!important%3Bbox-sizing%3Aborder-box!important%3Bposition%3Arelative!important%3Boverflow%3Ahidden!important%3B%7D%5Bdata-mbdlm-4by1%5D%7Bpadding-bottom%3A22%25!important%3B%7D%5Bdata-mbdlm-16by9%5D%7Bpadding-bottom%3A56.2%25!important%3B%7D%5Bdata-mbdlm-sq%5D%7Bpadding-bottom%3A22%25!important%3B%7D%5Bdata-mbdlm-16by9%5D%3Abefore%2C%5Bdata-mbdlm-4by1%5D%3Abefore%2C%5Bdata-mbdlm-sq%5D%3Abefore%7Bcontent%3A%22%22%3B-webkit-box-sizing%3Aborder-box%3Bbox-sizing%3Aborder-box%3Bdisplay%3Ablock%3Bposition%3Aabsolute%3Btop%3A0%3Bleft%3A0%3Bright%3A0%3Bbottom%3A0%3Bwidth%3A100%25%3Bheight%3A100%25%3Bbackground%3Argba(0%2C0%2C0%2C.8)%3Bopacity%3A0%3Bvisibility%3Bhidden%3Btransition-property%3Aopacity%2Cvisibility%3Btransition-timing-function%3Acubic-bezier(.4%2C0%2C.2%2C1)%3Btransition-duration%3A200ms%3B%7D%5Bdata-mbdlm-16by9%5D%3Aafter%2C%5Bdata-mbdlm-4by1%5D%3Aafter%2C%5Bdata-mbdlm-sq%5D%3Aafter%7Bcontent%3A%22%22%3Bdisplay%3Anone%3B-webkit-box-sizing%3Aborder-box%3Bbox-sizing%3Aborder-box%3Bbackground-clip%3Apadding-box%3Bposition%3Aabsolute%3Btop%3A50%25%3Bleft%3A50%25%3Bmargin%3A-48px%200%200%20-48px%3Bopacity%3A1%3Bborder%3A48px%20solid%20rgba(0%2C0%2C0%2C0)%3Bborder-top-color%3A%23fefefe%3Bwidth%3A48px%3Bheight%3A48px%3Bborder-radius%3A48px%3B-webkit-transform%3Arotate(0)%3Btransform%3Arotate(0)%3B%7D%5Bdata-mbdlm-16by9%5D%3Abefore%2C%5Bdata-mbdlm-4by1%5D%3Abefore%2C%5Bdata-mbdlm-16by9%5D%3Aafter%2C%5Bdata-mbdlm-4by1%5D%3Aafter%2C%5Bdata-mbdlm-sq%5D%3Abefore%2C%5Bdata-mbdlm-sq%5D%3Aafter%7Bz-index%3A9999%3B-webkit-pointer-events%3Anone%3Bpointer-events%3Anone%3Bcontain%3Astrict%3Bisolation%3Aisolate%3B%7D%5Bdata-mbdlm-16by9%5D%5Bdata-mbdlm-fetching%5D%3Aafter%2C%5Bdata-mbdlm-4by1%5D%5Bdata-mbdlm-fetching%5D%3Aafter%2C%5Bdata-mbdlm-sq%5D%5Bdata-mbdlm-fetching%5D%3Aafter%7Bdisplay%3Ablock%3B-webkit-animation%3Aspinner%201s%20cubic-bezier(.4%2C0%2C.2%2C1)%20infinite%3Banimation%3Aspinner%201s%20cubic-bezier(.4%2C0%2C.2%2C1)%20infinite%3B%7D%5Bdata-mbdlm-16by9%5D%5Bdata-mbdlm-fetching%5D%3Abefore%2C%5Bdata-mbdlm-4by1%5D%5Bdata-mbdlm-fetching%5D%3Abefore%2C%5Bdata-mbdlm-sq%5D%5Bdata-mbdlm-fetching%5D%3Abefore%7Bopacity%3A1%3Bvisibility%3Avisible%3B%7D%5Bdata-mbdlm-fill%5D%7Bposition%3Aabsolute%3Btop%3A0%3Bleft%3A0%3Bright%3A0%3Bbottom%3A0%3Bwidth%3A100%25%3Bheight%3A100%25%3Boverflow%3Ahidden%3B%7D%5Bdata-mbdlm-img%5D%7Bwidth%3Aauto%3Bheight%3Aauto%3Bmax-width%3A100%25%3B%7D%5Bdata-mbdlm-map%5D%7Bposition%3Aabsolute%3Btop%3A50%25%3Bleft%3A50%25%3B-webkit-transform%3Atranslate(-50%25%2C-50%25)%3Btransform%3Atranslate(-50%25%2C-50%25)%3Bmin-width%3A100%25%3Bmin-height%3A100%25%3Bwidth%3Aauto%3Bheight%3Aauto%3Bcursor%3Apointer%3B%7D%40-webkit-keyframes%20spinner%7B100%25%7B-webkit-transform%3Arotate(360deg)%7D%7D%40keyframes%20spinner%7B100%25%7Btransform%3Arotate(360deg)%7D%7D%3C%2Fstyle%3E'));
    _anchors = doc.getElementsByTagName('a');
    _config = typeof config !== 'undefined' ? config : null;
    _checker = checkDOM();
    _checker();
    addEvent(doc, 'readystatechange', _checker);
    addEvent(win, 'scroll', _checker);
  }

  function checkDOM () {
    return debounce(function (e) {
      var _iframe_src = '';
      var _f = 0;
      var _g = 0;
      var _ev = null;

      if (!!_config && 'querySelectorAll' in doc) {
        _anchors = ('container' in _config && !!_config.container ? doc.querySelector(_config.container) : doc).querySelectorAll('selector' in _config && !!_config.selector ? _config.selector : 'a');
      }
      _f = _anchors.length;
      _g = 0;
      _ev = (e || win.event);

      if (doc.readyState === 'loading') { return; }

      if (typeof _ev !== 'undefined' && !!_ev.type) {
        if (_ev.type !== 'scroll' && _ev.type !== 'onscroll' && (doc.readyState === 'interactive' || doc.readyState === 'complete')) {
          removeEvent(doc, 'readystatechange', _checker);
        }
        if ((_ev.type === 'scroll' || _ev.type === 'onscroll') && _f < 1) {
          removeEvent(win, 'scroll', _checker);
          return;
        }
      }

      for (; _g < _f; ++_g) {
        _iframe_src = '';

        if (typeof _anchors[_g] === 'undefined' || !_anchors[_g].getAttribute('href') || _anchors[_g].getAttribute('href').length < 5 || !isInViewport(_anchors[_g])) {
          continue;
        }

        _iframe_src = processURL(_anchors[_g]);

        if (typeof _iframe_src === 'string' && _iframe_src.length > 0) {
          makeInlineFrame(_iframe_src, _anchors[_g], true);
        }
      }
    }, 500);
  }

  function processURL (_link) {
    var _supports_cors = (!('XDomainRequest' in win) && 'DOMParser' in win); // minimum IE10
    var _url = _link.href || _link.getAttribute('href');
    var _by_dot;
    var _len;
    var _params;
    var _iframe_src;
    var _temp;

    _url = _url.match(/http:/) ? _url.replace('http:', 'https:') : _url;
    _url = _url.slice(-1) === '/' ? _url.slice(0, -1) : _url;
    _by_dot = _url.split('.');
    _len = _by_dot.length;
    _temp = '';

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
            _link.parentNode.insertAdjacentHTML('afterbegin','<em>(Link to potentially hazardous resource removed)</em>');
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

      case !!(_url.match(/\.mp4|\.webm|\.ogv/i) && 'HTMLVideoElement' in win):
        switch (_by_dot[_len - 1].toLowerCase()) {
          case 'mp4':
          case 'webm':
          case 'ogv':
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
      case !!(_url.match(/player\.vimeo\.com\/video\/\w+/)):
      case !!(_url.match(/player\.twitch\.tv\/\?\w+/)):
      case !!(_url.match(/clips\.twitch\.tv\/embed\?clip/)):
      case !!(_url.match(/bandcamp\.com\/EmbeddedPlayer\/\w+/)):
      case !!(_url.match(/open\.spotify\.com\/embed\?\w+/)):
      case !!(_url.match(/embed\.spotify\.com\/\?\w+/)):
      case !!(_url.match(/dailymotion\.com\/embed\/video\/\w+/)):
      case !!(_url.match(/imgur\.com\/\/a\/\w+\/embed\?/)):
      case !!(_url.match(/imgur\.com\/\w+\/embed\?/)):
      case !!(_url.match(/gfycat\.com\/ifr\/\w+/)):
      case !!(_url.match(/hulu\.com\/embed\.html\?\w+=\w+/)):
      case !!(_url.match(/codepen\.io\/\w+\/embed/)):
      case !!(_url.match(/appear\.in\/\w+/)):
      case !!(_url.match(/embed\.theguardian\.com\/embed\/video\//)):
      case !!(_url.match(/reuters\.com\/assets\/iframe\/yovideo\?/)):
      case !!(_url.match(/static01\.nyt.com\/video\/players\/offsite\//)):
      case !!(_url.match(/bloomberg\.com\/api\/embed\/iframe\?id=\d+/)):
      case !!(_url.match(/yahoo\.com\/[\w\d-_]+\.html\?format=embed/)):
      case !!(_url.match(/liveleak\.com\/ll_embed\?f=[\w\d-_]+/)):
      case !!(_url.match(/video-api\.wsj\.com\/api-video\//)):
      case !!(_url.match(/washingtonpost\.com\/video\/c\/embed\//)):
      case !!(_url.match(/abcnews\.go\.com\/video\/embed\?id=[\w\d-_]+/)):
      case !!(_url.match(/theatlantic\.com\/video\/iframe\//)):
      case !!(_url.match(/twitter\.com\/i\/videos\/\d+/)):
      //case !!(_url.match(/dailymail\.co\.uk\/embed\/video\/[\w\d-_]+\.html/)):
      case !!(_url.match(/cnn\.io\/v1\/fav\/\?video=\w+\/\d+\/\d+\/\d+\/[\w\d-_]+/)):
      // case !!(_url.match(/nationalgeographic\.com\/modules-video\/assets\/ngsEmbeddedVideo\.html\?guid=[\w\d-_]+/)):
      case !!(_url.match(/players\.brightcove\.net\/\d+\/[\w\d-_]+\/index\.html\?videoId=\d+/)):
      case !!(_url.match(/usatoday\.com\/videos\/embed\/\d+/)):
      //case !!(_url.match(/player\.cnbc\.com\/p\/gZWlPC\/cnbc_global\?playertype=synd&byGuid=\d+/)):
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

      case !!(_url.match(/vimeo\.com\/\w+/)):
        _iframe_src = 'https://player.vimeo.com/video/' + _url.match(/[^\/]+$/)[0] + '?portrait=0';
        break;

      case !!(_url.match(/facebook\.com\/\w+\/videos\/\w+/)):
        _iframe_src = 'https://www.facebook.com/v2.8/plugins/video.php?href=' + win.encodeURIComponent(_url);
        break;

      case !!(_url.match(/twitch\.tv\/\w+\/v\/\w+/)):
        _iframe_src = 'https://player.twitch.tv/?video=v' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/dailymotion\.com\/video\/\w+/)):
        _iframe_src = 'https://www.dailymotion.com/embed/video/' + _url.match(/[^\/]+$/)[0].split('_')[0];
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

      case !!(_url.match(/imgur\.com\/gallery\/\w+/)):
        _iframe_src = 'https://imgur.com/a/' + _url.match(/[^\/]+$/)[0] + '/embed?pub=true&analytics=false';
        break;

      case !!(_url.match(/imgur\.com\/\w+/)):
        _iframe_src = _url + '/embed?pub=true&analytics=false';
        break;

      case !!(_url.match(/gfycat\.com\/([A-Z][a-z]*)([A-Z][a-z]*)([A-Z][a-z]*)/)):
        _iframe_src = 'https://gfycat.com/ifr/' + _url.match(/[^\/]+$/)[0];
        break;

      case !!(_url.match(/jsfiddle\.com\/\w+/)):
        _iframe_src = _url + '/embedded';
        break;

      case !!(_url.match(/codepen\.io\/\w+\/\w+/)):
        _temp = _url.replace(/(https|http)(:\/\/)(codepen\.io)/, '');
        _iframe_src = 'https://codepen.io/' + _temp.match(/\w+\//gi)[0] + 'embed/' + _temp.match(/\w+\//gi)[1] + '?theme-id=23496&slug-hash=' + _temp.match(/\w+\//gi)[1] + '&default-tab=html,result&user=' + _temp.match(/\w+\//gi)[0] + '&embed-version=2&editable=true';
        _temp = null;
        break;

      case !!(_url.match(/jsbin\.com\/\w+/)):
        _iframe_src = _url.replace('edit', 'embed').replace('https', 'http');
        break;

      case !!(_url.match(/theguardian\.com\/[\w\d-_]+\/video\//)):
        _iframe_src = 'https://embed.theguardian.com/embed/video' + _url.replace(/(https:\/\/|http:\/\/)(www\.theguardian|theguardian)(\.com)/,'');
        break;

      case !!(_url.match(/reuters\.com/) && _url.match(/videoId=\d+/)):
        _iframe_src = 'https://www.reuters.com/assets/iframe/yovideo?' + _url.match(/videoId=\d+/)[0];
        break;

      case !!(_url.match(/nytimes\.com\/video\/\w+\/\d+/)):
        _iframe_src = 'https://static01.nyt.com/video/players/offsite/index.html?videoId=' + _url.match(/nytimes\.com\/video\/\w+\/\d+/)[0].replace(/[^\d]/g, '');
        break;

      case !!(_url.match(/wsj\.com\/video\/[\w\d-_]+\/[\w\d-_]+\.html/)):
        _iframe_src = 'https://video-api.wsj.com/api-video/player/v3/iframe.html?guid=' + (_url.match(/\/[\w\d-_]+.html/)[0].replace(/\/|.html/g,'')) + '&shareDomain=null';
        break;

      case !!(_url.match(/washingtonpost\.com\/video\/\w+/)):
        _temp = 'https://www.washingtonpost.com/video/c/embed/' + (_url.match(/\/[\w\d-_]+_video.html/)[0].replace(/\/|.html|_video/g,''));
        makeInlineFrame(_temp, _link, false);
        _temp = null;
        break;

      case !!(_url.match(/abcnews\.go\.com\/[\w\d-_]+\/video\/[\w\d-_]+/)):
        _iframe_src = 'https://abcnews.go.com/video/embed?id=' + _url.match(/video\/[\w\d-_]+/)[0].replace(/[^\d]/g, '');
        break;

      case !!(_url.match(/theatlantic\.com\/video\/\w+\/\d+\/[\w\d-_]+/)):
        _iframe_src = 'https://www.theatlantic.com/video/iframe/' + _url.match(/video\/\w+\/\d+/)[0].replace(/[^\d]/g, '');
        break;
        
      /* NO HTTPS
      case !!(_url.match(/dailymail\.co\.uk\/video\/\w+\/[\w\d-_]+/)):
        _iframe_src = 'https://www.dailymail.co.uk/embed/' + (_url.match(/video-\d+/)[0].replace('-', '/')) + '.html';
        break;
      */
        
      case !!(_url.match(/usatoday\.com\/media\/[\w\d-_]+\/video\/\d+/)):
        _iframe_src = 'https://www.usatoday.com/videos/embed/' + (_url.match(/video\/\d+/)[0].replace('video/','')) + '/?fullsite=true';
        break;
        
      case !!(_url.match(/cnn\.com\/videos\/\w+\/\d+\/\d+\/\d+\/[\w\d-_]+/)):
        _iframe_src = 'https://fave.api.cnn.io/v1/fav/?video=' + _url.match(/videos\/\w+\/\d+\/\d+\/\d+\/[\w\d-_]+/)[0].replace('videos/','') + '.cnn&customer=cnn&edition=international&env=prod';
        break;
      
      /* NO HTTPS
      case !!(_url.match(/cnbc\.com\/gallery\/\?video=\d+/)):
        _iframe_src = 'https://player.cnbc.com/p/gZWlPC/cnbc_global?playertype=synd&byGuid=' + getParams(_url).video + '&size=530_298';
        break;

      case !!(_url.match(/nationalgeographic\.com\/video\/[\w\d-_]+/) && !!_supports_cors):
        embedNG(_url, _link);
        break;
      */
        
      case !!(_url.match(/time\.com\/\d+\/[\w\d-_]+/) && !!_supports_cors):
        embedBC(_url, _link, false);
        break;
      
      // case !!(_url.match(/standard\.co\.uk\/news\/\w+/) && !!_supports_cors): malformed brightcove player reference
      // case !!(_url.match(/aljazeera\.com\/\w+\//) && !!_supports_cors): times out...
      /* DOESN'T SIZE PROPERLY
      case !!(_url.match(/channel4\.com\/news\/\w+/) && !!_supports_cors):
        embedBC(_url, _link, true);
        break;
      */
        
      case !!(_url.match(/twitter\.com\/\w+/) && !!_supports_cors):
        embedTW(_url, _link)
        break;

      case !!(_url.match(/yahoo\.com\/[\w\d-_]+\.html/) && !!_supports_cors):
        embedYH(_url, _link);
        break;

      case !!(_url.match(/liveleak\.com\/view\?i=[\w\d-_]+/) && !!_supports_cors):
        embedLL(_url, _link);
        break;

      case !!(_url.match(/ft\.com\/video\/\w+/) && !!_supports_cors):
        embedFT(_url, _link);
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

      case !!(_url.match(/google\..*@[^A-Za-z]+,/)):
        makeStaticMap(_url, _link);
        break;

      default:
        _iframe_src = '';
    }
    return _iframe_src;
  }

  function getParams (str) {
    var _query_string = '';
    var _pairs = [];
    var _params = {};
    var _key;
    var _i;

    if (typeof str !== 'string' || !str) { return; }

    _query_string = str.replace(/.*?\?/, '') || '';

    if (_query_string.length) {
      _pairs = _query_string.split('&');
      for (_i in _pairs) {
        _key = _pairs[_i].split('=')[0];
        if (!_key.length) { continue; }
        if (typeof _params[_key] === 'undefined') { _params[_key] = []; }
        _params[_key].push(_pairs[_i].split('=')[1]);
      }
    }
    return _params;
  }

  function embedTW (url, link) {
    var _ifr_url = 'https://f0c10a425.herokuapp.com/' + url;
    var _xhr = new win.XMLHttpRequest();

    _xhr.open('GET', _ifr_url, true);
    _xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    _xhr.responseType = 'text';
    addEvent(_xhr, 'readystatechange', function (e) {
      var _evt = (e.target || this);
      var _tw;
      var _indctr;
      if (_evt.readyState === 4 && _evt.status > 199 && _evt.status < 300) {
        _indctr = (new win.DOMParser().parseFromString(_evt.responseText, 'text/html')).querySelector('meta[property="og:video:url"]');
        if (!!_indctr && !!_indctr.getAttribute('content')) {
          _tw = _indctr.getAttribute('content').replace(/\?embed_source=\w+/gi, '');
          return makeInlineFrame(_tw, link, true);
        }
      }
    });
    addEvent(_xhr, 'error', function () {
      console.warn('Error making request');
    });
    win.setTimeout(function () {
      _xhr.send(null);
    }, 0);
  }

  function embedNG (url, link) {
    var _cors_url = 'https://f0c10a425.herokuapp.com/' + url;
    var _xhr = new win.XMLHttpRequest();

    _xhr.open('GET', _cors_url, true);
    _xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    _xhr.responseType = 'text';
    addEvent(_xhr, 'readystatechange', function (e) {
      var _evt = (e.target || this);
      var _guid_el;
      var _ifr_url;
      if (_evt.readyState === 4 && _evt.status > 199 && _evt.status < 300) {
        _guid_el = (new win.DOMParser().parseFromString(_evt.responseText, 'text/html')).querySelector('[data-guid]');
        if (!!_guid_el.getAttribute('data-guid')) {
          _ifr_url = 'https://assets.nationalgeographic.com/modules-video/assets/ngsEmbeddedVideo.html?' + _guid_el.getAttribute('data-guid');
          makeInlineFrame(_ifr_url, link, true);
        }
      }
    });
    addEvent(_xhr, 'error', function () {
      console.warn('Error making request');
    });
    win.setTimeout(function () {
      _xhr.send(null);
    }, 0);
  }

  function embedBC (url, link, autoplay) {
    var _cors_url = 'https://f0c10a425.herokuapp.com/' + url;
    var _xhr = new win.XMLHttpRequest();

    _xhr.open('GET', _cors_url, true);
    _xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    _xhr.responseType = 'text';
    addEvent(_xhr, 'readystatechange', function (e) {
      var _evt = (e.target || this);
      var _vid, _txt;
      var _ifr_url;
      if (_evt.readyState === 4 && _evt.status > 199 && _evt.status < 300) {
        _txt = _evt.responseText;
        _vid = (new win.DOMParser().parseFromString(_txt, 'text/html')).querySelector('[data-video-id]');
        if (!!_vid && !!_vid.getAttribute('data-video-id') && !!_vid.getAttribute('data-player') && !!_vid.getAttribute('data-account')) {
          _ifr_url = 'https://players.brightcove.net/' + _vid.getAttribute('data-account') + '/' + _vid.getAttribute('data-player') + '_default/index.html?videoId=' + _vid.getAttribute('data-video-id') + (!!autoplay ? '&autoplay' : '');
          makeInlineFrame(_ifr_url, link, false);
        } else if (!!_txt.match(/data-video-id=(\\"|")\d+/) && _txt.match(/data-account=(\\"|")\d+/) && _txt.match(/data-player=(\\"|")[\w\d_-]+/)) {
          _ifr_url = 'https://players.brightcove.net/' + (_txt.match(/data-account=(\\"|")\d+/)[0].replace(/[^\d]/g, '')) + '/' + _txt.match(/data-player=(\\"|")[\w\d_-]+/)[0].replace(/data-player=/,'').replace(/(\\"|")/g, '') + '_default/index.html?videoId=' + _txt.match(/data-video-id=(\\"|")\d+/)[0].replace(/[^\d]/g, '') + (!!autoplay ? '&autoplay' : '');
          makeInlineFrame(_ifr_url, link, false);
        }
      }
    });
    addEvent(_xhr, 'error', function () {
      console.warn('Error making request');
    });
    win.setTimeout(function () {
      _xhr.send(null);
    }, 0);
  }

  function embedLL (url, link) {
    var _cors_url = 'https://f0c10a425.herokuapp.com/' + url;
    var _xhr = new win.XMLHttpRequest();

    _xhr.open('GET', _cors_url, true);
    _xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    _xhr.responseType = 'text';
    addEvent(_xhr, 'readystatechange', function (e) {
      var _evt = (e.target || this);
      var _vid;
      var _ll;
      if (_evt.readyState === 4 && _evt.status > 199 && _evt.status < 300) {
        _vid = (new win.DOMParser().parseFromString(_evt.responseText, 'text/html')).querySelector('video');
        if (!!_vid && !!_vid.getAttribute('id')) {
          _ll = 'https://www.liveleak.com/ll_embed?f=' + _vid.getAttribute('id').replace('player_file_','').substring(0,12);
          return makeInlineFrame(_ll, link, true);
        }
      }
    });
    addEvent(_xhr, 'error', function () {
      console.warn('Error making request');
    });
    win.setTimeout(function () {
      _xhr.send(null);
    }, 0);
  }

  function embedYH (url, link) {
    var _cors_url = 'https://f0c10a425.herokuapp.com/' + url + '?format=embed';
    var _xhr = new win.XMLHttpRequest();
    
    _xhr.open('GET', _cors_url, true);
    _xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    _xhr.responseType = 'text';
    addEvent(_xhr, 'readystatechange', function (e) {
      var _evt = (e.target || this);
      var _err;
      if (_evt.readyState === 4 && _evt.status > 199 && _evt.status < 300) {
        _err = (new win.DOMParser().parseFromString(_evt.responseText, 'text/html')).querySelector('.embed-error');
        if (!_err) {
          return makeInlineFrame((url + '?format=embed'), link, true);
        }
      }
    });
    addEvent(_xhr, 'error', function () {
      console.warn('Error making request');
    });
    win.setTimeout(function () {
      _xhr.send(null);
    }, 0);
  }

  function embedFT (url, link) {
    var _cors_url = 'https://f0c10a425.herokuapp.com/' + url;
    var _xhr = new win.XMLHttpRequest();
    
    _xhr.open('GET', _cors_url, true);
    _xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    _xhr.responseType = 'text';
    addEvent(_xhr, 'readystatechange', function (e) {
      var _evt = (e.target || this);
      var _vid;
      var _src_vid;
      if (_evt.readyState === 4 && _evt.status > 199 && _evt.status < 300) {
        var _vid = (new DOMParser().parseFromString(_evt.responseText, 'text/html')).querySelector('video');
        if (!!_vid) {
          _src_vid = _vid.getAttribute('src');
          if (!!_src_vid && _src_vid.match(/\.mp4|\.webm|\.ogg|\.ogv/i)) {
            return makeVideo(_src_vid, link, _src_vid.match(/\.mp4|\.webm|\.ogg|\.ogv/i)[0]);
          }
        }
      }
    });
    addEvent(_xhr, 'error', function(){
      console.warn('Error making request');
    });
    win.setTimeout(function () {
      _xhr.send(null);
    }, 0);
  }

  function embedVK (_params, _link) {
    var _proxy = 'https://f0c10a425.herokuapp.com/';
    var _vk_url = _proxy + 'https://vk.com/video' + _params[0] + '_' + _params[1];
    var _xhr = new win.XMLHttpRequest();
    
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

  function getVKHash (markup, params) {
    return 'https://vk.com/video_ext.php?oid=' + params[0] + '&id=' + params[1] + '&hash=' + (markup.match(/hash[^0-9a-f]*([0-9a-f]*)/)[1])  + '&hd=1';
  }

  function makeInlineFrame (url, to_replace, sandbox) {
    var _16x9_div;
    var _iframe;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }
    
    if (typeof to_replace.parentNode !== 'object' || !to_replace.parentNode || to_replace.parentNode.nodeType !== 1) {
      return;
    }

    _16x9_div = createPlaceholder('16by9');
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);

    _iframe = doc.createElement('iframe');

    setAttributes(_iframe, {
      'data-mbdlm-fill': '',
      'allowtransparency': 'true',
      'frameborder': 'no',
      'scrolling': 'no',
      'referrerpolicy': 'no-referrer',
      'src': url,
      'allowFullscreen': 'allowFullscreen'
    });

    if (!!sandbox) {
      _iframe.setAttribute('sandbox', 'allow-scripts allow-presentation allow-same-origin allow-orientation-lock');
    }

    addEvent(_iframe, 'load', fetchFinished);
    _16x9_div.appendChild(_iframe);
  }

  function makeDownload(url, to_replace) {
    var _4x1_div;
    var _dl;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }
    
    if (typeof to_replace.parentNode !== 'object' || !to_replace.parentNode || to_replace.parentNode.nodeType !== 1) {
      return;
    }

    _4x1_div = createPlaceholder('4by1');
    to_replace.parentNode.replaceChild(_4x1_div, to_replace);
    _dl = doc.createElement('div');

    finishOnMutation(_4x1_div, _dl, 'load');

    setAttributes(_dl, {
      'data-mbdlm-fill': '',
      'data-mbdlm-url': win.encodeURIComponent(url)
    });

    _4x1_div.appendChild(_dl);
    addEvent(_dl, 'click', fakeLink);
  }

  function makeImage (url, to_replace) {
    var _div = doc.createElement('div');
    var _img;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }
    
    if (typeof to_replace.parentNode !== 'object' || !to_replace.parentNode || to_replace.parentNode.nodeType !== 1) {
      return;
    }

    to_replace.parentNode.replaceChild(_div, to_replace);
    _img = doc.createElement('img');

    setAttributes(_img, {
      'data-mbdlm-img': '',
      'src': url,
      'alt': to_replace.textContent ? to_replace.textContent : url,
      'title': to_replace.textContent ? to_replace.textContent : url,
      'data-mbdlm-url': win.encodeURIComponent(url)
    });

    _div.appendChild(_img);
    addEvent(_img, 'load', fetchFinished);
    addEvent(_img, 'click', fakeLink);
  }

  function makeVideo (url, to_replace, type) {
    var _16x9_div;
    var _video;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }
    
    if (typeof to_replace.parentNode !== 'object' || !to_replace.parentNode || to_replace.parentNode.nodeType !== 1) {
      return;
    }

    _16x9_div = createPlaceholder('16by9');
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);
    _video = doc.createElement('video');

    finishOnMutation(_16x9_div, _video, 'canplay');

    setAttributes(_video, {
      'data-mbdlm-fill': '',
      'preload': 'auto',
      'controls': 'controls',
      'muted': 'muted',
      'webkitplaysinline': '',
      'playsinline': ''
    });

    _16x9_div.appendChild(_video);
    _video.insertAdjacentHTML('afterBegin', '<source src="' + url + '" type="video/' + type + '"></source>');
  }

  function makeAudio (url, to_replace, type) {
    var _4x1_div;
    var _audio;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }
    
    if (typeof to_replace.parentNode !== 'object' || !to_replace.parentNode || to_replace.parentNode.nodeType !== 1) {
      return;
    }

    _4x1_div = createPlaceholder('4by1');
    to_replace.parentNode.replaceChild(_4x1_div, to_replace);
    _audio = doc.createElement('audio');

    finishOnMutation(_4x1_div, _audio, 'canplay');

    setAttributes(_audio, {
      'data-mbdlm-fill': '',
      'preload': 'auto',
      'controls': 'controls',
      'muted': 'muted',
    });

    _4x1_div.appendChild(_audio);
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
    
    if (typeof to_replace.parentNode !== 'object' || !to_replace.parentNode || to_replace.parentNode.nodeType !== 1) {
      return;
    }

    _16x9_div = createPlaceholder('16by9');
    to_replace.parentNode.replaceChild(_16x9_div, to_replace);
    _img = doc.createElement('img');
    _16x9_div.appendChild(_img);
    _latlang = url.match(/@([^A-Za-z]+,)/)[0].slice(0,-1).replace('@', '');
    _cW = _16x9_div.clientWidth > 1 ? _16x9_div.clientWidth : '1';
    _cH = _16x9_div.clientHeight > 1 ? _16x9_div.clientHeight : '1';
    _z  = +(url.match(/(,\d+\.\d+z)|(,\d+z)/)[0].replace(',', '').replace('z', ''));

    setAttributes(_img, {
      'src': 'https://maps.googleapis.com/maps/api/staticmap?center=' + _latlang + '&size=' + _cW + 'x' + _cH + '&sensor=false&maptype=roadmap&zoom=' + ((_z >= 12 ? _z - 3 : _z) | 0) + '&markers=' + _latlang + '&key=AIzaSyAf7V-aqUb-Guull54mvfrH61hFUbNPqvM',
      'alt': 'Google Map',
      'title': 'Google Map: ' + _latlang,
      'data-mbdlm-map': '',
      'data-mbdlm-url': win.encodeURIComponent(url)
    });

    addEvent(_img, 'load', fetchFinished);
    addEvent(_img, 'click', fakeLink);
  }

  function createPlaceholder (aspect_ratio) {
    var _el = doc.createElement('div');
    _el.setAttribute('data-mbdlm-' + aspect_ratio, '');
    _el.setAttribute('data-mbdlm-fetching', '');
    return _el;
  }

  function finishOnMutation (to_observe, to_reveal, e_type) {
    var _o;
    if ('MutationObserver' in win) {
      _o = new win.MutationObserver(function (mutations) {
        var i = 0;
        for (; mutations.length > i; ++i) {
          if (mutations[i].type === 'childList') {
            _o.disconnect();
            fetchFinished({'currentTarget': to_reveal, 'type': null});
          }
        }
      });
      _o.observe(to_observe, { childList: true });
    } else {
      addEvent(to_reveal, e_type, fetchFinished);
    }
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
      if (!!_evt.type) { removeEvent(_evt, _ev.type, fetchFinished); }
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
      for (var i = 0; i < arguments.length; ++i) { args[i] = arguments[i]; }
      if (!scheduled) { scheduled = win.setTimeout(later, wait); }
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

  function setAttributes (el, attrs) {
    var _key;
    for (_key in attrs) {
      el.setAttribute(_key, attrs[_key]);
    }
  }

  function addEvent (target, type, handler) {
    switch (true) {
      case !!('addEventListener' in win):
        return target.addEventListener(type, handler, false);
      case !!('attachEvent' in win):
        return target.attachEvent(type, handler);
      default:
        target['on' + type] = handler;
    }
  }

  function removeEvent (target, type, handler) {
    switch (true) {
      case !!('removeEventListener' in win):
        return target.removeEventListener(type, handler, false);
      case !!('detachEvent' in win):
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
