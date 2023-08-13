
# Drive Music Player

Play your music files stored in Google Drive.

## Todo

- Scrollbar
- Redo webcontent link, check old code, gapless?
- Show 'now playing' somewhere and highlight playing track
- Track end and next/previous track, check old code
- Demo content - use public domain albums (CC on Bandcamp)
- Use (React) audio player
    - Gapless playback?
    - Previous button should restart track if not early in seek
- Create documentatian on Google API setup, rename app? No API key needed?
- Check tab accessibility (details focus on load)
- Catch refresh w/ JS, warn about reauth
- Request app verification w/ Google (doubtful b/c restricted scope)
- Simple analytics (generate authed url)
- Add legal links? And link to GH repo (MIT license?)
- Host on GH pages (no custom domain)
- Could grab artworks?

### Later

- Service worker / PWA / manifest?
- Match other browser native audio player
- Temporarily store access token to keep alive on refresh?

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
