
# Drive Music Player

Play your music files stored in Google Drive.

## TODO

- Demo content - use public domain albums (CC on Bandcamp)
- Use React audio player
    - Gapless playback?
    - Previous button should restart track if not early in seek
- Create documentatian on Google API setup, rename app? No API key needed?
- Check tab accessibility (details focus on load)
- Catch refresh w/ JS to avoid re-auth
- Can Google auth process be shorter? Skip perms prompt?
- Service worker / PWA / manifest?
- Request app verification w/ Google
- Simple analytics (generate authed url)
- Add legal links? And link to GH repo (MIT license?)
- Host on GH pages (no custom domain)

## Local Development

Run `python3 -m http.server` to start a local web server. 

## References

- My folder is 1O2qmU-ov57GUN9bwmCUWLLVSRagWuj4m
- [JavaScript Quickstart for Google Drive API](https://developers.google.com/drive/api/quickstart/js)
- [Google API key restrictions](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions)
- [React audio player example](https://codesandbox.io/s/react-w877cp)


https://stackoverflow.com/questions/11103582/how-do-you-detect-when-html5-audio-has-finished-playing-more-than-once
