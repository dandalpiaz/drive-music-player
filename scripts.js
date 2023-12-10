
/* ----------------------- */
/* -----GOOGLE INIT------- */
/* ----------------------- */

const CLIENT_ID = '865687982989-kv2vrmhsvs5484ebe8up2j8so7ralptg.apps.googleusercontent.com';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
  });
  gisInited = true;
}

function handleAuthClick(folderId) {
  tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }

      // set parentfolder as root if nothing set
      if ( localStorage.getItem("parentfolder") == "" || localStorage.getItem("parentfolder") == null ) {
        localStorage.setItem("parentfolder", "root");
        folderId = "root";
      }

      // only load initial contents on first auth
      if ( !document.getElementById("contents").classList.contains("loaded") ) {
        getContents(folderId, "initial");
        localStorage.setItem("returning", "true");
        document.getElementById('return').style.display = 'none';
      }

      // set user email and URL
      gapi.client.drive.about.get({
        'fields' : "user",
      }).then(function(response) {
        window.location.hash = '#~' + response.result.user.permissionId;
        localStorage.setItem("email", response.result.user.emailAddress);
      });      
  };
  
  if ( gapi.client.getToken() === null ) {
    tokenClient.requestAccessToken({prompt: '', login_hint: localStorage.getItem("email")});
  } else {
    tokenClient.requestAccessToken({prompt: '', login_hint: localStorage.getItem("email")});
  }

  // use to see token
  //console.log( gapi.client.getToken() );
}

function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      // can use this to simulate expired token
      gapi.client.setToken('');
  }
}

/* ----------------------- */
/* -------DRIVE API------- */
/* ----------------------- */

function changeImgSrc(detailsId, newSrc) {
  var detailsElement = document.getElementById(detailsId);
  if (detailsElement) {
    var summaryElement = detailsElement.querySelector('summary');
    var imgElement = summaryElement.querySelector('img');
    if (imgElement) {
      imgElement.src = newSrc;
    }
  }
}

function getArts() {
  var albumartquery = "mimeType contains 'image/' and trashed = false and name contains 'folder.jpg' ";
  gapi.client.drive.files.list({
    'pageSize': 1000,
    'q' : albumartquery,
    'fields': "nextPageToken, files(id, name, webContentLink, parents)"
  }).then(function(response) {
    if (response.result.files && response.result.files.length > 0) {
      console.log(response);
      for (var i = 0; i < response.result.files.length; i++) {
        changeImgSrc(response.result.files[i].parents[0], response.result.files[i].webContentLink);
      }
    }
  });
}

function getContents(id, type) {
  var contentsQuery = "'" + id + "'" + " in parents and trashed = false ";
  gapi.client.drive.files.list({
    'pageSize': 1000,
    'q' : contentsQuery,
    'orderBy': 'name',
    'fields': "nextPageToken, files(id, name, mimeType, webContentLink)"
  }).then(function(response) {

    // hide intro
    document.getElementById('intro').style.display = 'none';

    // set location
    if ( type == "initial" ) {
      var location = "contents";
    } else {
      var location = id;

      // check for previous load
      if ( document.getElementById(location).classList.contains("loaded") ) {
        return;
      }
    }
    
    var files = response.result.files;
    if (files && files.length > 0) {

      // loop folders
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if ( file.mimeType.includes("application/vnd.google-apps.folder") ) {
          document.getElementById(location).innerHTML += `
          <details id="${file.id}">
            <summary onclick="getContents('${file.id}')"><img src=""/><span>${file.name}</span></summary>
          </details>
          `;
        }

        document.getElementById(location).classList.add("loaded");
      }

      getArts();

      // loop files
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if ( file.mimeType.includes("audio") ) {
          document.getElementById(location).innerHTML += `
          <button class="track" onclick="playTrack('${file.id}', this)"><i class="fas fa-play"></i> ${file.name}</button>
          `;
        }

        document.getElementById(location).classList.add("loaded");
      }

    } else {
      alert('No files found.'); 
    }

    document.getElementById(location).firstElementChild.focus();
  }).catch(function(error) {
    if (error.status === 401) {
      alert("Sessions are only valid for 1 hour. Session will refresh automatically.");
      tokenClient.requestAccessToken({prompt: '', login_hint: localStorage.getItem("email")});
    } 
  });
}

/* ----------------------- */
/* ------USER FOLDER------ */
/* ----------------------- */

function submitFolderId(e) {
  e.preventDefault();
  localStorage.setItem("parentfolder", document.getElementById('parentfolder').value);
  handleAuthClick(document.getElementById('parentfolder').value);
}

function getFolderId() {
  document.getElementById('parentfolder').value = localStorage.getItem("parentfolder");
}

/* ----------------------- */
/* ---------AUDIO--------- */
/* ----------------------- */

audio = document.getElementById('audio');
source = document.getElementById('source');
if ( document.getElementsByClassName("playing")[0] ) {
  playing = document.getElementsByClassName("playing")[0];
} else {
  playing = false;
}

function playTrack(id, element, type) {
  // remove spinner if load in progress
  if ( document.getElementById("spinner") ) {
    document.getElementById("spinner").remove();
  }

  // check if clicked track is already 'playing'
  if ( element == playing ) {
    if ( audio.paused ) {
      audio.play();
    } else {
      audio.pause();
    }
    return;
  }

  // check for something already 'playing'
  if ( playing ) {
    resetIconToPlay();
    playing.classList.remove("playing");
  }

  // set new track
  element.classList.add("playing");
  playing = document.getElementsByClassName("playing")[0];
  audio.pause();
  source.src = "";
  audio.load();

  spinner = `
    <div id="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;
  playing.innerHTML += spinner;

  // demo track
  if ( type == "demo" ) {
    source.src = "https://drive.google.com/uc?id=" + id + "&export=download";
    audio.load();
    audio.oncanplay = audio.play();
    if ( document.getElementById("spinner") ) {
      document.getElementById("spinner").remove();
    }
    return;
  } 

  // user track
  gapi.client.drive.files.get({
    'fileId' : id,
    'alt': 'media',
  }).then(function(response) {
    dataArr = Uint8Array.from(response.body.split('').map((chr) => chr.charCodeAt(0)));
    file = new File([dataArr], 'audiofilename', { type: response.headers['Content-Type'] });
    source.src = URL.createObjectURL(file);
    source.type = response.headers['Content-Type'];
    audio.load();
    audio.oncanplay = audio.play();
    if ( document.getElementById("spinner") ) {
      document.getElementById("spinner").remove();
    }
  }).catch(function(error) {
    if (error.status === 401) {
      alert("Sessions are only valid for 1 hour. Session will refresh automatically.");
      tokenClient.requestAccessToken({prompt: '', login_hint: localStorage.getItem("email")});
    } 
  });
}

function prevTrack() {
  if ( audio.currentTime > 3 || !playing.previousElementSibling.previousElementSibling ) {
    audio.currentTime = 0;
    audio.play();
  } else if ( playing.previousElementSibling.previousElementSibling ) {
    resetIconToPlay();
    playing.previousElementSibling.click();
  }
}

function nextTrack() {
  if ( playing.nextElementSibling ) {
    resetIconToPlay();
    playing.nextElementSibling.click();
  }
}

function resetIconToPlay() {
  playing.firstChild.classList.remove("fa-pause");
  playing.firstChild.classList.add("fa-play");
  if ( document.getElementById("bars") ) {
    document.getElementById("bars").remove();
  } 
}

function resetIconToPause() {
  playing.firstChild.classList.remove("fa-play");
  playing.firstChild.classList.add("fa-pause");
  indicator = `
    <div id="bars">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  `;
  playing.innerHTML += indicator;
}

audio.onended = function() {
  if ( playing.nextElementSibling ) {
    playing.nextElementSibling.focus();
  }
  nextTrack();
};

audio.onpause = function() {
  resetIconToPlay();
}
audio.onplay = function() {
  resetIconToPause();
}

/* ----------------------- */
/* -------PAGE LOAD------- */
/* ----------------------- */

if ( localStorage.getItem("returning") == "true" && localStorage.getItem("parentfolder") !== null ) {
  document.getElementById('return').style.display = 'block';
} else {
  document.getElementById('intro').style.display = 'block';
}

function changeFolder() {
  // show intro with parentfolder form
  document.getElementById('return').style.display = 'none';
  document.getElementById('intro').style.display = 'block';
  document.getElementById('parentfolder').focus();
  // reset contents div
  document.getElementById("contents").classList.remove("loaded");
  document.getElementById("contents").innerHTML = "";
  // reset localstorage
  localStorage.setItem("returning", "false");
  localStorage.removeItem("email");
}








// gapless playback attempt
// the switch between two loaded audio elements still has a gap
// can start playing second track early, but gap will be inconsistent

/*
<audio id="audio2" controls style="display: none;">
  <source id="source2" src="" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
*/

/*
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

*/

