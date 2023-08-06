
const CLIENT_ID = '287941413176-519ook6nkgvpt69e820p6hdcb9218loo.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDAx2KY_QZoJ5VKpUrL_Q8Z13OHYCgf-Kw';
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
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  //maybeEnableButtons();
  
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
  });
  gisInited = true;
  //maybeEnableButtons();
}

/*
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}
*/

function handleAuthClick() {
  tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      //document.getElementById('signout_button').style.visibility = 'visible';
      //document.getElementById('authorize_button').innerText = 'Refresh';
      //await listFiles();
      findMusicFolder();
      $('#intro').hide();
  };
  
  if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
      tokenClient.requestAccessToken({prompt: ''});
  }
}

function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      //document.getElementById('content').innerText = '';
      //document.getElementById('authorize_button').innerText = 'Authorize';
      //document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

/*
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    findMusicFolder();
    $('#intro').hide();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    $('#intro').show();
  }
}
*/


/*
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    console.log(error);
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    findMusicFolder();
    $('#intro').hide();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    $('#intro').show();
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  location.reload();
}

*/
