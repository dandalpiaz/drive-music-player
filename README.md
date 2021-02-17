# Play Your Music
A cross-platform music player for cloud-based files

## TODO

- selected/playing song use red text
- album page - centered art (SP)
- gapless playback
- now playing display, instead of full seek on mobile
- better back navigation
- smaller font size, more weight, more line-height
- all user to select folder from Drive
    - Drive file picker
    - Store in cookie?
- remove header? (or do reddit is fun style - hidden on scroll) all mobile menu?
- album art view - grid with no padding
- Demo - use public domain music (archive.org)
- Fetch new data button (clear cache)
- Fix up sidebar
- new logo (manifest, favicon, header)
- header scroll and nav display (like android reddit?)
- theme-color on new session for android (remove from manifest?)
- Back to top button
- add search/filter at the top of album list
- cache the now playing section and always show?
- Cache API https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api
- play button on hover from album page
- tag reading - https://ericbidelman.tumblr.com/post/8343485440/reading-mp3-id3-tags-in-javascript
    - could add neat aligned columns for artist, album
    - third column could be horitonal track listing which are links to start individual tracks
- previous button should restart track if not early in seek
- allow YouTube links instead of audio files
- wrap with electron for desktop app
- PYM - add times to seek, add WIP to intro, add to portfolio, use ID for hash instead of album name, host on GH pages?
- show file structure in instructions
- issue with seek not continuing after interaction
- now playing should open current album
- shuffle / repeat
- album-art only view
- need paging above 1000 for api calls
- service worker, caching for offline
- run lighthouse audit
- text-only view (missing or no image)
- tab order, keyboard nav .focus() will help
- local playlists
- redo the Google API property (and name)
- PWA cache - https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
- Cordova
- marketing copy
	- Spotify 10,000 limit
	- support artists by using bandcamp, amazon mp3
- enable hash urls, fix back button
- add googleanalytics
- copyright
- privacy policy
- donate
- issues - http://debuggerdotbreak.judahgabriel.com/2018/04/13/i-built-a-pwa-and-published-it-in-3-app-stores-heres-what-i-learned/
- https://stackoverflow.com/questions/20079067/get-file-from-google-drive-and-covert-to-blob
- https://developers.google.com/drive/api/v3/manage-downloads

CACHE

- https://stackoverflow.com/questions/37860901/how-to-use-google-drive-api-to-download-files-with-javascript
- https://stackoverflow.com/questions/32172466/loading-mp3-as-arraybuffer-using-local-file-for-web-audio

## Scope change for downloading and cache

https://www.googleapis.com/auth/drive.readonly 

```
var fileId = '1YcYmEqqnUYPIo1h0NDHudo1YeVWLUsKt';
var accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;// or this: gapi.auth.getToken().access_token;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.googleapis.com/drive/v3/files/"+fileId+'?alt=media', true);
xhr.setRequestHeader('Authorization','Bearer '+accessToken);
xhr.responseType = 'arraybuffer'
xhr.onload = function(){

    console.log( URL.createObjectURL(new Blob([xhr.response])) );
    
    var audio = $("audio");  
    $('source').attr("src", URL.createObjectURL(new Blob([xhr.response])));
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element
    audio[0].oncanplaythrough = audio[0].play();

    //console.log(xhr.response);
}
xhr.send();
```