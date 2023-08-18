
// gapless playback attempt
// the switch between two loaded audio elements still has a gap
// can start playing second track early, but gap will be inconsistent

/*
<audio id="audio2" controls style="display: none;">
  <source id="source2" src="" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
*/

audio2 = document.getElementById('audio2');

function lastSecond() {
    if ( audio.currentTime > audio.duration - .2572 ) {
      audio2.play();
      audio.removeEventListener("timeupdate", lastSecond);
    }
  }
  
function lastTenSeconds() {
    if ( audio.currentTime > audio.duration - 10 ) {
        audio.removeEventListener("timeupdate", lastTenSeconds);
        gapi.client.drive.files.get({
        'fileId' : "1UcOF2cYttKyfKcNbwFzWVKDbcGov-rMn",
        'alt': 'media',
        }).then(function(response) {
            dataArr = Uint8Array.from(response.body.split('').map((chr) => chr.charCodeAt(0)));
            file = new File([dataArr], 'audiofilename', { type: response.headers['Content-Type'] });
            source2.src = URL.createObjectURL(file);
            audio2.load();
        });
        //[audio, audio2] = [audio2, audio];
    }
}

audio.addEventListener("timeupdate", lastTenSeconds);
audio.addEventListener("timeupdate", lastSecond);

