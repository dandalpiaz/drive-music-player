
# Drive Music Player

Play your music files stored in Google Drive.

## Todo

- Log back in display
- Footer links
- Add spinner during track load
- Use blobs for audio (fix demos, play sequencing, test FF)
- Intro text - can use "root"
- Re-create g-app, no api key, document process here
- Gapless playback using two audio elements
- New access token after an hour?
- Host to GH pages (no custom domain), allow domain in g-app
- Add legal links, link to GH repo
- Simple analytics (generate authed url)
- Service worker / PWA / manifest?
- Publish g-app and request verification

### Later

- Get audio files in chunks (byte range) for quicker start?
- Catch refresh w/ JS, warn about reauth
- Scrollbar styles (FF, Safari)
- File picker examples? Use lesser scope?
- Temporarily store access token to keep alive on refresh? Not recommended?
- Could grab artworks? Add art loop in api query
- Use React audio player?
- Start caching api content, if needed
- Styles for native audio player in Safari
- Light mode? Alternative [styles](https://cdnjs.com/libraries/github-markdown-css)

## Local Development

Run `python3 -m http.server` to start a local web server. 

## References

- [Googel Drive API - JavaScript Quickstart](https://developers.google.com/drive/api/quickstart/js)
- [Google Drive API - Downloading Files](https://developers.google.com/drive/api/v3/manage-downloads)
- [Google Drive API - Token Requests](https://developers.google.com/identity/oauth2/web/guides/use-token-model)
- [Google Drive API - JavaScript Authorization](https://developers.google.com/identity/oauth2/web/reference/js-reference)
- [Google Drive API - Scopes](https://developers.google.com/drive/api/guides/api-specific-auth)
- [React audio player example](https://codesandbox.io/s/react-w877cp)

