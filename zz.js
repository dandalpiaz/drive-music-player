

var fileId = '1YcYmEqqnUYPIo1h0NDHudo1YeVWLUsKt';
var accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;// or this: gapi.auth.getToken().access_token;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.googleapis.com/drive/v3/files/"+fileId+'?alt=media', true);
xhr.setRequestHeader('Authorization','Bearer '+accessToken);
xhr.responseType = 'arraybuffer'
xhr.onload = function(){

    //console.log( URL.createObjectURL(new Blob([xhr.response])) );

    const audioBlob = new Blob([xhr.response]);

    caches.open('my-cache').then((cache) => { // add to cache
        cache.put(audioBlob);
      });
    
    //var audio = $("audio");  
    //$('source').attr("src", URL.createObjectURL(new Blob([xhr.response])));
    //audio[0].pause();
    //audio[0].load();//suspends and restores all audio element
    //audio[0].oncanplaythrough = audio[0].play();

}
xhr.send();




var fileId = '1YcYmEqqnUYPIo1h0NDHudo1YeVWLUsKt';
var accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;// or this: gapi.auth.getToken().access_token;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.googleapis.com/drive/v3/files/"+fileId+'?alt=media', true);
xhr.setRequestHeader('Authorization','Bearer '+accessToken);
xhr.responseType = 'arraybuffer'
xhr.onload = function(){

    //console.log( URL.createObjectURL(new Blob([xhr.response])) );

    caches.open('my-cache').then((cache) => { // add to cache
        cache.put('/test.json', new Response( new Blob([xhr.response]) ));
      });

}
xhr.send();