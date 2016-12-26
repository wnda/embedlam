;(function (win, doc) {

  'use strict';

  var anchors;

  if (!('performance' in win)) {
    win.performance = {
      'now': function () { return new win.Date().getTime() }
    };
  }

  // assign all HTMLAnchors to the list to process
  anchors = doc.getElementsByTagName('a');

  // initial check
  checkDocument();

  // subsequent checks
  addEvent(win, 'DOMContentLoaded', checkDocument);
  addEvent(win, 'load', checkDocument);
  addEvent(win, 'scroll', debounce(checkDocument, 500));

  function checkDocument (e) {

    // remove event handlers for DOMContentLoaded/load events, which fire once
    if (typeof e === 'object' && !!e && 'type' in e && !!e.type) {
      if (e.type === 'load' || e.type === 'DOMContentLoaded') {
        win.removeEventListener(e.type, checkDocument, false);
      }
    }

    // convert HTMLCollection to Array to enable [].forEach
    [].slice.call(anchors).forEach(function (link) {

      var iframe_src = '';

      if (typeof link === 'undefined' || typeof link.href === 'undefined' || !link.href || link.href.length < 5 || !isInViewport(link)) {
        // skip links that have no href, are hashlinks, or are not visible
        // we could later expose an API to only select anchors with a data-attribute like 'data-embed-me=true'
        return;
      }

      // send the anchor's href contents to the embed URL encoder
      iframe_src = processUrl(link);

      if (typeof iframe_src === 'string' && iframe_src.length > 0) {
        // send the processed embed URL to the iframe factory
        makeInlineFrame(iframe_src, link, true);
      }
    });
  }

  function processUrl (_link) {
    // Here, we want to analyze the href contents and pair it off with
    // a suitable embed URL, extracting parameters using regexp
    var _url = _link.href;         // cache href contents
    var _by_dot = _url.split('.'); // cache url divided by periods
    var _len;                      // initialise length of array of _by_dot
    var _params;                   // initialise an array for URL parameters
    var _iframe_src;               // initialise the variable we will eventually return
    var _supports_cors = ('fetch' in win || 'XMLHttpRequest' in win || 'XDomainRequest' in win); // need CORS for VK

    // rewrite urls to use https
    _url = _url.match(/http:/) ? _url.replace('http:', 'https:') : _url;

    // chop off trailing slash
    _url = _url.slice(-1) === '/' ? _url.slice(0, -1) : _url;

    // if-elseif is very verbose with this many conditions,
    // so we'll use a fairly obscure but entirely valid switch-case instead
    switch (true) {

      // we need to force a boolean expression ('!!') to match to switch(true)
      // match image types supported in modern browsers
      case !!(_url.match(/\.jpg|\.jpeg|\.png|\.apng|\.gif|\.webp|\.bmp|\.ico|\.tiff|\.svg/i)):
        // embed images if not in img tag already
        _len = _by_dot.length;
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

      case !!(_url.match(/\.mp4|\.webm/)):
        if ('HTMLVideoElement' in win) {
          // may as well embed raw video where/when possible
          _len = _by_dot.length;
          if (_by_dot[_len - 1] === 'mp4' || _by_dot[_len - 1] === 'webm') {
            makeVideo(_url, _link, _by_dot[_len - 1]);
            // _iframe_src is not modified, and returned as empty string, checkDocument's for loop continues
          }
        }
        break;

      case !!(_url.match(/\.mp3|\.m4a|\.wav/)):
        if ('HTMLAudioElement' in win) {
          // same goes for audio files
          _len = _by_dot.length;
          if (_by_dot[_len - 1] === 'mp3' || _by_dot[_len - 1] === 'm4a' || _by_dot[_len - 1] === 'wav') {
            makeAudio(_url, _link, _by_dot[_len - 1]);
          }
        }
        break;

      // youtube embed url, return unmodified
      // NB: this catches any embed URL, like playlists, not only videos
      case !!(_url.match(/youtube\.com\/embed\/\w+/)):
        _iframe_src = _url;
        break;

      // youtube standard url, return conversion to embed url
      case !!(_url.match(/youtube\.com\/watch\?v=\w+/)):
        _iframe_src = 'https://www.youtube.com/embed/' + getParams(_url).v;
        break;

      // youtube social share url, return conversion to embed url
      case !!(_url.match(/youtu\.be\/\w+/)):
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\/]+$/)[0];
        break;

      // youtube weird /v/ url, return conversion to embed url
      case !!(_url.match(/youtube\.com\/v\/\w+/)):
        _iframe_src = 'https://www.youtube.com/embed/' + _url.match(/[^\/]+$/)[0];
        break;

      // youtube playlist url, return conversion to embed url
      case !!(_url.match(/youtube\.com\/playlist\?list=\w+/)):
        _iframe_src = 'https://www.youtube.com/embed/videoseries?list=' + getParams(_url).list;
        break;

      // vimeo embed url, return unmodified
      case !!(_url.match(/player\.vimeo\.com\/video\/\w+/)):
        _iframe_src = _url;
        break;

      // vimeo standard url, return embed url
      case !!(_url.match(/vimeo\.com\/\w+/)):
        _iframe_src = 'https://player.vimeo.com/video/' + _url.match(/[^\/]+$/)[0] + '?portrait=0';
        break;

      // facebook video url, return embed api url and encode original url
      case !!(_url.match(/facebook\.com\/\w+\/videos\/\w+/)):
        _iframe_src = 'https://www.facebook.com/v2.8/plugins/video.php?href=' + win.encodeURIComponent(_url);
        break;

      // twitch tv embed url, return unmodified (catches channel or video)
      case !!(_url.match(/player\.twitch\.tv\/\?\w+/)):
        iframe_src = _url;
        break;

      // twitch tv clip url, return unmodified
      case !!(_url.match(/clips\.twitch\.tv\/embed\?clip/)):
        _iframe_src = _url;
        break;

      // twitch tv video url, return embed url
      case !!(_url.match(/twitch\.tv\/\w+\/v\/\w+/)):
        _iframe_src = 'https://player.twitch.tv/?video=v' + _url.match(/[^\/]+$/)[0];
        break;

      // dailymotion embed url, return unmodified
      case !!(_url.match(/dailymotion\.com\/embed\/video\/\w+/)):
        _iframe_src = _url;
        break;

      // dailymotion standard url, return embed url
      case !!(_url.match(/dailymotion\.com\/video\/\w+/)):
        _iframe_src = 'https://www.dailymotion.com/embed/video/' + _url.match(/[^\/]+$/)[0].split('_')[0];
        break;

      // bandcamp embed url, return unmodified
      case !!(_url.match(/bandcamp\.com\/EmbeddedPlayer\/\w+/)):
        _iframe_src = _url;
        break;

      // spotify embed url, return unmodified
      case !!(_url.match(/open\.spotify\.com\/embed\?\w+/)):
        _iframe_src = _url;
        break;

      // spotify embed shorthand url, return unmodified (spotify 301 redirect)
      case !!(_url.match(/embed\.spotify\.com\/\?\w+/)):
        _iframe_src = _url;
        break;

      // spotify playlist url, return speculative embed url
      case !!(_url.match(/spotify\.com\/user\/\w+\/playlist\/\w+/)):
        _iframe_src = 'https://embed.spotify.com/?uri=spotify:user:' + (_url.split('/')[0] !== 'https:' ? _url.split('/')[2] : _url.split('/')[4]) + '/playlist/' + _url.match(/[^\/]+$/)[0];
        break;

      // spotify track url, return embed url
      case !!(_url.match(/spotify\.com\/track\/\w+/)):
        _iframe_src = 'https://embed.spotify.com/?uri=spotify:track:' + _url.match(/[^\/]+$/)[0];
        break;

      // vine standard url, return embed url (NB: vine is shutting down, may not need this)
      case !!(_url.match(/vine\.co\/v\/\w+/)):
        _iframe_src = _url + '/embed/postcard';
        break;

      // soundcloud share url, return embed url (not very useful, but it's there)
      case !!(_url.match(/api\.soundcloud\.com\/tracks\/\w+/)):
        _iframe_src = 'https://w.soundcloud.com/player/?url=' + win.encodeURIComponent(_url) + '&auto_play=false&show_artwork=true&color=0066cc';
        break;

      // imgur album/gallery embed url, return unmodified
      case !!(_url.match(/imgur\.com\/\/a\/\w+\/embed\?/)):
        _iframe_src = _url;
        break;

      // imgur generic image embed url, return unmodified
      case !!(_url.match(/imgur\.com\/\w+\/embed\?/)):
        _iframe_src = _url;
        break;

      // imgur gallery url, return embed url
      case !!(_url.match(/imgur\.com\/gallery\/\w+/)):
        _iframe_src = 'https://imgur.com/a/' + _url.match(/[^\/]+$/)[0] + '/embed?pub=true&analytics=false';
        break;

      // imgur album url, return embed url
      case !!(_url.match(/imgur\.com\/a\/\w+/)):
        _iframe_src = _url + '/embed?pub=true&analytics=false';
        break;

      // gfycat embed url, return unmodified
      case !!(_url.match(/gfycat\.com\/ifr\/\w+/)):
        _iframe_src = _url;
        break;

      // gfycat standard url, return embed url (we have to pattern match here, potentially unreliable)
      case !!(_url.match(/gfycat\.com\/([A-Z][a-z]*)([A-Z][a-z]*)([A-Z][a-z]*)/)):
        _iframe_src = 'https://gfycat.com/ifr/' + _url.match(/[^\/]+$/)[0];
        break;

      // hulu embed url (unlikely but still)
      case !!(_url.match(/hulu\.com\/embed\.html\?\w+=\w+/)):
        _iframe_src = _url;
        break;

      // google maps url, pass to static map factory
      case !!(_url.match(/google\..*@[^A-Za-z]+,/)):
        makeStaticMap(_url, _link);
        break;

      // vk search results link with video selected, pass to embedVK function
      case !!(_url.match(/vk\.com\/video\?\w+/) && !!_supports_cors):
        _params = getParams(a).z[0].match(/[^video]+$/)[0].split('_');
        _link.href = '#';
        _link.className = 'fetching';
        embedVK(_params, _link);
        break;

      // vk direct video link, pass to embedVK function
      case !!(_url.match(/vk\.com\/video-\w+/) && !!_supports_cors):
        _params = _url.match(/[^\/]+$/)[0].match(/[^video]+$/)[0].split('_');
        _link.href = '#';
        _link.className = 'fetching';
        embedVK(_params, _link);
        break;

      // if no case matched, or if the only matches needed to be passed along,
      // return empty string and continue loop
      default:
        _iframe_src = '';
    }
    // returning either empty string or an embeddable URL
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
    // VK is a special case, as its embed URLs require a hash to be computed from their videos' webpages
    // the hash is computable with regular expression match, but we need to get the html for the webpage
    // before we embed it. to do that, we need to use a CORS proxy to ajax the page, compute the hash,
    // and include the hash as a parameter in the embed URL.
    var _proxy = 'https://cors-anywhere.herokuapp.com/';
    var _vk_url = _proxy + 'https://vk.com/video' + _params[0] + '_' + _params[1];
    var _xhr = 'XMLHttpRequest' in win ? new win.XMLHttpRequest() : {};
    var _xdr;

    if ('fetch' in win) {
      // because why not?
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
      // obviously most browsers will support this method
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
      // IE8, IE9 support
      // NB: absolute no clue whether XDR would actually work for this
      // or whether string.match works in IE8-9

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

      // wrapping send in setTimeout apparently fixes an IE bug... lol
      win.setTimeout(function () {
        _xdr.send();
      }, 0);

    }
  }

  function makeInlineFrame (url, to_replace, sandbox) {
    // create a div with 16:9 aspect ratio (responsive) and iframe positioned absolutely within
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

  function makeImage (url, to_replace) {
    // create a div with 16:9 aspect ratio (responsive) and img positioned absolutely within
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

    to_replace.parentNode.replaceChild(_16x9_div, to_replace);

    // add click handler to imitate link
    addEvent(_16x9_div, 'click', fakeLink);
  }

  function makeVideo (url, to_replace, type) {
    // for the odd occasion where someone posts a link to a raw video
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
    // for the even rarer occasion that someone should post raw audio
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
    // direct google maps URLs are not trival to predict/decode, but will typically include latitude and longitude
    // which, fortuitously, is the only requirement for displaying a suitable static maps API substitute
    // latlang is trivial to extract by means of regex, as is the zoom level
    var _16x9_div;
    var _img;
    var _latlang;

    if (typeof to_replace !== 'object' || !to_replace || to_replace.nodeType !== 1) {
      return;
    }

    _16x9_div = doc.createElement('div');
    _img = doc.createElement('img');
    _latlang = url.match(/@([^A-Za-z]+,)/)[0].slice(0,-1).replace('@', '');

    _16x9_div.setAttribute('style', 'position:relative;padding-bottom:56.2%;overflow:hidden;background-color:#444;cursor:pointer;');
    _16x9_div.appendChild(_img);

    if ('transform' in _img.style) {
      _img.setAttribute('style', 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;cursor:pointer;');
    } else if ('webkitTransform' in _img.style) {
      _img.setAttribute('style', 'position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;cursor:pointer;');
    } else {
      _img.setAttribute('style', 'width:auto;height:100%;margin:0 auto;cursor:pointer;');
    }

    // build the static maps URL. sticking to an aspect ratio
    // enables us to use clientWidth/Height to get an appropriate size
    // for the static map image
    _img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
               _latlang +
               '&size=' + _16x9_div.clientWidth + 'x' + _16x9_div.clientHeight +
               '&sensor=false&maptype=roadmap&zoom=' +
               url.match(/,\d\dz/)[0].replace(',', '').replace('z', '') +
               '&markers=' + _latlang +
               '&key=AIzaSyAf7V-aqUb-Guull54mvfrH61hFUbNPqvM';
    _img.alt = 'Google Map';
    _img.title = 'Google Map';

    to_replace.parentNode.replaceChild(_16x9_div, to_replace);

    // it's a static map, so it should be possible to provide a clickable link to an interactive map
    // if we create a standard anchor element, it will be grabbed by getElementsByTagName
    // we can safely say javascript is enabled, so attach an event listener to the 16:9 div instead
    addEvent(_16x9_div, 'click', fakeLink);
  }

  function isInViewport (el) {
    // simple but effective and well supported
    var r = el.getBoundingClientRect();
    return (r.top >= 0 && r.left >= 0 && r.top <= (win.innerHeight || doc.documentElement.clientHeight));
  }

  function debounce (func, wait) {
    // a debouncing function, for the expensive scroll event
    var scheduled, args, context, timestamp;
    return function () {
      context = this;
      args = [];
      timestamp = win.performance.now;

      // NB: arguments is never accessed directly. it is aliased to a new array
      // and passed with func.apply. this means v8 won't choke.
      for (var i = 0; i < arguments.length; ++i) {
        args[i] = arguments[i];
      }

      // the timeout is also recycled as opposed to being recreated each time.
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
        w.addEventListener(x, y, false);
        break;
      case ('attachEvent' in win):
        w.attachEvent(x, y);
        break;
      default:
        w['on' + x] = y;
    }
  }

  function fakeLink () {
    return win.open(url);
  }

})(window, window.document);
