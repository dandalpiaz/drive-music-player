
/* ----------------------- */
/* -----GOOGLE INIT------- */
/* ----------------------- */

const CLIENT_ID = '287941413176-519ook6nkgvpt69e820p6hdcb9218loo.apps.googleusercontent.com';
//const API_KEY = 'AIzaSyDAx2KY_QZoJ5VKpUrL_Q8Z13OHYCgf-Kw';
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
    //apiKey: API_KEY,
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
      getContents(folderId, "initial");
  };
  
  if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({prompt: ''});
  } else {
      tokenClient.requestAccessToken({prompt: ''});
  }
}

function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
  }
}

/* ----------------------- */
/* -------DRIVE API------- */
/* ----------------------- */

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
            <summary onclick="getContents('${file.id}')">${file.name}</summary>
          </details>
          `;
        }

        document.getElementById(location).classList.add("loaded");
      }

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

function playTrack(id, element) {
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

  // play new track
  element.classList.add("playing");
  playing = document.getElementsByClassName("playing")[0];
  var track = "https://drive.google.com/uc?id=" + id + "&export=download";
  source.src = track;
  audio.pause();
  audio.load();
  audio.play(); //audio.oncanplaythrough = audio.play();
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

