
# Drive Music Player

Play your music files stored in Google Drive.

## Todo

- Host on my Ubuntu box w/ custom domain (symlink, nginx, letsencrypt - document)
- New access token after an hour?
- Scrollbar
- Redo webcontent link, check old code, gapless?
- Highlight playing track, check old code
- Track end and next/previous track, check old code
- Demo content - use public domain albums (CC on Bandcamp)
- Use (React) audio player
    - Gapless playback?
    - Previous button should restart track if not early in seek
- Create documentatian on Google API setup, rename app? No API key needed?
- Check tab accessibility (details focus on load)
- Catch refresh w/ JS, warn about reauth
- Request app verification w/ Google (doubtful b/c restricted scope)
- File picker examples? Use lesser scope?
- Simple analytics (generate authed url)
- Add legal links? And link to GH repo (MIT license?)
- Service worker / PWA / manifest?

### Later

- Match other browser native audio player?
- Temporarily store access token to keep alive on refresh?
- Host on GH pages (no custom domain)?
- Could grab artworks?

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
