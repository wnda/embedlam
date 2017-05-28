# embedlam

## What?
There were once lazyloaders, and they were lovely for loading images before they were visible. Now there's a lazy-embedder.

## Using embedlam
Usage is pretty straightforward: include the script. That's it.

    <script async defer src="/path/to/embedlam.js"></script>

It fires automatically, i.e. as soon as it's parsed in v0.1.0; in v0.2.1, it fires as soon as the `readystatechange` event fires on the `document` with a value that isn't `loading`. In both versions, the embedding process fires for every scroll event per 500ms.

As of v0.2.0, the script no longer executes itself, and accepts an optional configuration object like so:

    <div id="a_cool_id">
      <a href="https://bla.com/v?b0645439/" data-embedlam-target></a>
      <a href="https://amaze.com/v?5128234/" data-embedlam-target></a>
      <a href="https://wow.com/v?8831093/" data-embedlam-target></a>
      <a href="https://sht.com/v?iw3og94/" data-embedlam-target></a>
    </div>
    
    <script async defer src="/path/to/embedlam.js"></script>
    <script>
      window.embedlam.init({
        "selector": "a[data-embedlam-target]" // -> document.querySelectorAll('a[data-embedlam-target]')
        "container": "#a_cool_id"             // -> document.querySelector('#a_cool_id')
      });
    </script>

Both keys should contain a CSS selector string that can be processed by `querySelector`. Calling `init()` with no config object will result in every link on the page being scrutinised, which could result in some unexpected things being embedded if you're not careful.

## What links are parsed/scraped by embedlam?

Full support | Partial/experimental support | No support |
|------------|------------------------------|------------|
| Direct link video | Hulu | BBC (they do all sorts of `Blob` nonsense presumably to discourage scraping or to buffer efficiently) |
| Direct link audio | The Guardian | The Telegraph (cba to navigate their bizarre video system yet) |
| Direct link image | Bloomberg Video | Fox News (nothing personal, their video site is broken |
| Youtube | Soundcloud | |
| Vimeo | Spotify | |
| DailyMotion | Google Maps <sup>1</sup> | |
| Facebook Video | Twitch TV | |
| Twitter Video | | |
| Vine | | |
| Imgur | | |
| Gfycat | | |
| Appear.in | | |
| Codepen | | |
| JSBin | | |
| JSFiddle | | |
| Reuters Video | | |
| NYTimes Video | | |
| Yahoo News Video | | |
| Wall Street Journal Video | | |
| FT Video | | |
| ABC News Video | | |
| The Atlantic Video | | |
| Daily Mail Video | | |
| CNN Video | | |
| National Geographic Video | | |
| USA Today Video | | |
| Washington Post Video | | |
| LiveLeak Video | | |
| Channel4 News Video | | |
| Al Jazeera Video | | |
| Evening Standard Video | | |
| National Geographic Video | | |
| CNBC Video | | |

-------

<sup>1</sup> Support for Google Maps is limited to automatically displaying a Static Maps API snapshot of the latitude/longitude specified in the URL. It's also not going to work for everyone yet as I am mulling making my API key available for all domains...

## Why?
Then one day, someone thought it would be clever to automatically embed Youtube videos in forum threads. And everybody on 2G/3G wept, for they would forever be waiting for the embedding process to complete for the entire thread.

Some clever people came up with the idea of showing only so many threads at a time, but this is only really a good idea for threads with thousands of posts. otherwise you're firing ajax requests every time you scroll, which is just plain crap. Seriously, try using Discourse on 2G/3G. You'll get frustrated very quickly compared to browsing a forum running punbb/fluxbb.

Sure, Discourse scales better, it's designed to do that, but it's still about as nice to use as Twitter. Okay, maybe it's not quite as shitty as Twitter. But let's face it, the top 10 most hated websites in terms of UX are 'web apps' which oblige you to download a relative ton of JavaScript to rub in your face.

I do not have a solution for the direction the web has taken. But I do have something which can take the pain out of embedding. embedlam is designed to automatically embed links which are known to be compatible with iframes, and will optimistically attempt to embed video/audio files. It even blocks potentially harmful files, because it would be irresponsible not to.

The trick is that it only does the embedding process while the embedded content is visible within the viewport. And debouncing takes care of the problem of the scroll event's expense.

## No, really, why?
embedly sticks its ugly logo on content, charges money at some point down the line, and in general is too heavy for my liking, since it dumps underscore.js and its widget script on the unsuspecting user. It also doesn't detect if the thing to embed is in the viewport.  

## What's the catch? 
No catch! Unless you're a developer and you want to extend this lib. You're not going to like my code. I like `switch` statements and I write pretty terse code that could not be classified as team-friendly. Open source software is two things for me: an outlet for my non-team coding, and my opportunity to experiment with ideas. *Caveat emptor*.

## Browser support
CORS is required for some of the news sites, Twitter & VKontakte.
`DOMParser` (`text/html`) is also required to perform the scraping.

So realistically this library will not work in anything less than IE10.
