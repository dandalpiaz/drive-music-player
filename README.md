
# Drive Music Player

Play your music files stored in Google Drive, https://dandalpiaz.github.io/drive-music-player/

## Table of Contents

- [About](#about)
- [Initial Setup](#initial-setup)
- [Local Development](#local-development)
- [Todo](#todo)
    - [Next](#next)
    - [Later](#later)
- [References](#references)

## About

The aim of this project is to create a browser-based application that can play music files from a user's Google Drive storage. To keep development simple and easy-to-maintain, emphasis is put on native browser features, for example:

- **Native `<audio>` element** - styled on a per-browser basis to blend in with the design
- **Native `<details>` & `<summary>` elements** - to nagivate a user's nested folders, recursively
- **Vanilla JavaScript** - for any custom JS needed. More advanced/mobile features could be added using React Native or Cordova, but that's outside the initial scope of the project.

## Initial Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/), click the project selection drop-down in the top navigation and start a 'New Project'.
2. Give the project a name, create the project, and 'Select' the project. 
3. Click the link for 'APIs & Services' and the click 'Enabled APIs and Services'. Search for 'Google Drive API' and enable that API.
4. Click the 'Create Credentials' button, make sure the Drive API is select, choose 'User data', click 'Next'. 
5. Give the app a name, add a support and developer email address and click 'Save and Continue'. 
6. Click the 'Add or Remove Scopes' button, search for 'Drive' and add the 'drive.readonly' scope. Click 'Save and Continue'.
7. Choose 'Web application' for the OAuth Client ID type. Add "http://localhost" and your domain as 'Authorized JavaScript origins'.
8. Add the 'Client ID' in the `scripts.js` file in this repository. Click 'Done'.
9. Click the 'Quotas' tab. Update the 'Queries per 100 seconds per user' to be 100.
10. In 'APIs & Services' click 'OAuth consent screen' in the sidebar and add 'Test users'. This is also where the app can be published.

## Local Development

Run `python3 -m http.server` to start a local web server. 

### Webkit / Safari Testing

```
npx playwright install

npx playwright wk http://localhost:8000
```

## Todo

### Next

- Better focus indicators (contrast)
- Store access token? Get new token when close to expiration? Based on user action?
- Custom domain (cloudflare, update repo, GH, g-app), analytics, authed url test
- Add legal links
- Publish g-app and request verification, post
- Bars bug (click multiple tracks)
- Styles for native audio player in Safari

### Later

- Could grab artworks? Add art loop in api query
- Error handling for rate limits
- Mobile playthrough, [lockscreen controls](https://web.dev/media-session/) ?
- Gapless playback using two audio elements?
- Get audio files in chunks (byte range) for quicker start?
- Scrollbar styles (Firefox, Safari)
- Start caching api content, if needed

## References

- [Googel Drive API - JavaScript Quickstart](https://developers.google.com/drive/api/quickstart/js)
- [Google Drive API - Downloading Files](https://developers.google.com/drive/api/v3/manage-downloads)
- [Google Drive API - Token Requests](https://developers.google.com/identity/oauth2/web/guides/use-token-model)
- [Google Drive API - JavaScript Authorization](https://developers.google.com/identity/oauth2/web/reference/js-reference)
- [Google Drive API - Scopes](https://developers.google.com/drive/api/guides/api-specific-auth)
- [Google access token and refresh](https://stackoverflow.com/questions/72855090/google-oauth-session-lost-after-page-reload-javascript)
- [Google app verification](https://support.google.com/cloud/answer/13463073)
- [React audio player example](https://codesandbox.io/s/react-w877cp)

