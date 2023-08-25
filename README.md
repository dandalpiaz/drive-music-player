
# Drive Music Player

Play your music files stored in Google Drive, https://dandalpiaz.github.io/drive-music-player/

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

## Todo

- Custom domain (cloudflare, update repo, GH, g-app), analytics, authed url test
- Use root folder if other ID not set / manage localstorage
- Styles for native audio player in Safari
- Add legal links
- Publish g-app and request verification, post
- Switch account
- Set up service worker / PWA (mobile playthrough, [lockscreen controls](https://web.dev/media-session/))
- Need new access token after an hour?

### Later

- Landing page [background](https://vincentgarreau.com/particles.js/)?
- Gapless playback using two audio elements
- Add link to GH repo?
- Error handling (including rate limits)
- Get audio files in chunks (byte range) for quicker start?
- Scrollbar styles (Firefox, Safari)
- File picker examples? Use lesser scope?
- Could grab artworks? Add art loop in api query
- Use React audio player?
- Start caching api content, if needed
- Light mode? Alternative [styles](https://cdnjs.com/libraries/github-markdown-css)

## References

- [Googel Drive API - JavaScript Quickstart](https://developers.google.com/drive/api/quickstart/js)
- [Google Drive API - Downloading Files](https://developers.google.com/drive/api/v3/manage-downloads)
- [Google Drive API - Token Requests](https://developers.google.com/identity/oauth2/web/guides/use-token-model)
- [Google Drive API - JavaScript Authorization](https://developers.google.com/identity/oauth2/web/reference/js-reference)
- [Google Drive API - Scopes](https://developers.google.com/drive/api/guides/api-specific-auth)
- [React audio player example](https://codesandbox.io/s/react-w877cp)

