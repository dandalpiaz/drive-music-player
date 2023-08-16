
# Drive Music Player

Play your music files stored in Google Drive.

## Todo

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
- Temporarily store access token to keep alive on refresh?
- Could grab artworks?
- Use React audio player?
- Styles for native audio player in Safari
- Light mode?

## Local Development

Run `python3 -m http.server` to start a local web server. 

## References

- [JavaScript Quickstart for Google Drive API](https://developers.google.com/drive/api/quickstart/js)
- [Google API key restrictions](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions)
- [React audio player example](https://codesandbox.io/s/react-w877cp)
- https://developers.google.com/drive/api/v3/manage-downloads
- https://developers.google.com/identity/oauth2/web/reference/js-reference
- https://developers.google.com/identity/oauth2/web/guides/use-token-model
- https://developers.google.com/drive/api/guides/api-specific-auth
