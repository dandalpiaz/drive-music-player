
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
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
  });
  gisInited = true;
}

function handleAuthClick() {
  tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      //listAllTracks("1FgHDW5g6RbBsMrvM_GWvWXzonwJpV1uf");
      getContents("1O2qmU-ov57GUN9bwmCUWLLVSRagWuj4m");
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
  }
}

