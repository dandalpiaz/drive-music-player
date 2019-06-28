# Play Your Music
A cross-platform music player for cloud-based files

## TODO

- now playing should open modal
- shuffle / repeat
- allow scroll on h1
- need paging above 1000 for api calls
- dark theme, light theme
- service worker, caching for offline
- run lighthouse audit
- text-only view (missing or no image)
- tab order, keyboard nav .focus() will help
- local playlists
- domain: playyourmusic.app
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