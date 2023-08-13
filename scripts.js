
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

/*
var mylist = $('#track-list');
var listitems = mylist.children('button').get();
listitems.sort(function(a, b) {
  return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
})
$.each(listitems, function(idx, itm) { mylist.append(itm); });

// highlight current track, if available
var currentTrackId = $('source').attr("data-track-id");
$(".track[data-track-id='" + currentTrackId + "']").addClass('track-active');
*/

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
/* -----APP FUNCTIONS----- */
/* ----------------------- */

function submitFolderId(e) {
  e.preventDefault();
  localStorage.setItem("parentfolder", document.getElementById('parentfolder').value);
  handleAuthClick(document.getElementById('parentfolder').value);
}

function getFolderId() {
  document.getElementById('parentfolder').value = localStorage.getItem("parentfolder");
}

function playTrack(id, element) {  
  if ( document.getElementsByClassName("playing")[0] ) {
    document.getElementsByClassName("playing")[0].classList.remove("playing");
  }
  element.classList.add("playing");
  var track = "https://drive.google.com/uc?id=" + id + "&export=download";
  var audio = document.getElementById('audio');
  var source = document.getElementById('source');
  source.src = track;
  audio.pause();
  audio.load();
  audio.play();
  //audio[0].oncanplaythrough = audio[0].play();
}

function prevTrack() {
  var audio = document.getElementById('audio');
  if ( audio.currentTime > 3 || !document.getElementsByClassName("playing")[0].previousElementSibling.previousElementSibling ) {
    audio.currentTime = 0;
  } else if ( document.getElementsByClassName("playing")[0].previousElementSibling.previousElementSibling ) {
    document.getElementsByClassName("playing")[0].previousElementSibling.click();
  }
}

function nextTrack() {
  if ( document.getElementsByClassName("playing")[0].nextElementSibling ) {
    document.getElementsByClassName("playing")[0].nextElementSibling.click();
  }
}

var audio = document.getElementById("audio");
audio.onended = function() {
  nextTrack();
};
