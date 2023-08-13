
# Drive Music Player

Play your music files stored in Google Drive.

## Todo

- New access token after an hour?
- Scrollbar
- Create documentatian on Google API setup, rename app? No API key needed?
- Check tab accessibility (details focus on load)
- Catch refresh w/ JS, warn about reauth
- Publish g-app and request app verification w/ Google (doubtful b/c restricted scope)
- Simple analytics (generate authed url)
- Add legal links
- Service worker / PWA / manifest?
- Host on my Ubuntu box w/ custom domain (symlink, nginx, letsencrypt - document)

### Later

- Gapless playback, check old code
- File picker examples? Use lesser scope?
- Match other browser native audio player?
- Temporarily store access token to keep alive on refresh?
- Switch host to GH pages (no custom domain)?
- Add link to GH repo (if opening source)
- Could grab artworks?
- Use React audio player

## Local Development

Run `python3 -m http.server` to start a local web server. 

## References

- [JavaScript Quickstart for Google Drive API](https://developers.google.com/drive/api/quickstart/js)
- [Google API key restrictions](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions)
- [React audio player example](https://codesandbox.io/s/react-w877cp)
- https://stackoverflow.com/questions/11103582/how-do-you-detect-when-html5-audio-has-finished-playing-more-than-once
- https://developers.google.com/identity/oauth2/web/reference/js-reference
- https://developers.google.com/identity/oauth2/web/guides/use-token-model
- https://developers.google.com/drive/api/guides/api-specific-auth
