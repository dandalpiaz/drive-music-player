# WIP - play-your-music
album-centric music player for audio files in Google Drive

## TODO

- screenshot for homepage
- need paging above 1000 for api calls
- favicon and icon
- menu section
- dark theme, light theme
- service worker, caching for offline
- run audits
- text-only view (missing or no image)
- create custom audio player
- tab order when opening tracklist

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