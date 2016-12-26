# embedlam

## What?
There were once lazyloaders, and they were lovely for loading images before they were visible. Now there's a lazy-embedder.

## Why?
Then one day, someone thought it would be clever to automatically embed Youtube videos in forum threads. And everybody on 2G/3G wept, for they would forever be waiting for the embedding process to complete for the entire thread.

Some clever people came up with the idea of showing only so many threads at a time, but this is only really a good idea for threads with thousands of posts. otherwise you're firing ajax requests every time you scroll, which is just plain crap. Seriously, try using Discourse on 2G/3G. You'll get frustrated very quickly compared to browsing a forum running punbb/fluxbb.

Sure, Discourse scales better, it's designed to do that, but it's still about as nice to use as Twitter. Okay, maybe it's not quite as shitty as Twitter. But let's face it, the top 10 most hated websites in terms of UX are 'web apps' which a ton of JavaScript to download and rub in your face.

I do not have a solution for the direction the web has taken. But I do have something which can take the pain out of embedding. embedlam is designed to automatically embed links which are known to be compatible with iframes, and will optimistically attempt to embed video/audio files. It even blocks potentially harmful files, because it would be irresponsible not to.

The trick is that it only does the embedding process while the embedded content is visible within the viewport. And debouncing takes care of the problem of the scroll event's expense.

## No, really, why?
embedly sticks its ugly logo on content, charges money at some point down the line, and in general is probably a bit too heavy/featureful (not a word) for my liking.  

## What's the catch? 
No catch! Unless you're a developer and you want to extend this lib. You're not going to like my code. I like `switch` statements and I write pretty terse code that could not be classified as team-friendly. Open source software is two things for me: an outlet for my non-team coding, and my opportunity to experiment with ideas. *Caveat emptor*.

## Using embedlam
Usage is pretty straightforward: include the script. That's it. 

    <script async defer src="/path/to/embedlam.js"></script>

It fires automatically, i.e. as soon as it's parsed, as soon as the `load` event fires, and for every scroll event per 500ms.

In the future, I might expose a public method to control the debouncing speed (not really necessary to change it though) and perhaps the ability to specify a selector. You might not want to embed EVERYTHING that matches a certain URL-string pattern, so that's definitely on the to-do list.

When that public method is exposed, the script will no longer execute itself, but will require a configuration object specified in a call to said method:

    <script async defer src="/path/to/embedlam.js"></script>
    <script>
      embedlam.init({
        "selector": "a[data-embed]"
      });
    </script>
    
Still pretty straightforward.
