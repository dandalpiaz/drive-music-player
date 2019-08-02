
var fileId = '1YcYmEqqnUYPIo1h0NDHudo1YeVWLUsKt';
var accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;// or this: gapi.auth.getToken().access_token;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.googleapis.com/drive/v3/files/"+fileId+'?alt=media', true);
xhr.setRequestHeader('Authorization','Bearer '+accessToken);
xhr.responseType = 'arraybuffer'
xhr.onload = function(){
    caches.open('my-cache').then((cache) => { // add to cache
      cache.put('/12345', new Response( new Blob([xhr.response]) ));
    });
}
xhr.send();

caches.open('my-cache').then((cache) => { // add to cache
  cache.match('/12345').then((response) => {
    return response.blob();
  }).then(function(data) {
    //console.log(data);
    $('.audio-player').show();
    var audio = $("audio");  
    $('source').attr("src", URL.createObjectURL(new Blob([data])));
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element
    audio[0].oncanplaythrough = audio[0].play();
  });
});