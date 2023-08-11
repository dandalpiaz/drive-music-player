
# Drive Music Player

Play your music files stored in Google Drive.

## TODO

- Demo content - use public domain albums (archive.org)
- Use React audio player
    - Gapless playback?
    - Previous button should restart track if not early in seek
- Create documentatian on Google API setup, rename app? No API key needed?
- Check tab accessibility (details focus on load)
- Can Google auth process be shorter? Skip perms prompt?
- Service worker / PWA / manifest?
- Request app verification w/ Google
- Simple analytics
- Add legal links, and link to GH repo (license?)
- Host on GH pages

## Local Development

Run `python3 -m http.server` to start a local web server. 

## References

- My folder is 1O2qmU-ov57GUN9bwmCUWLLVSRagWuj4m
- [JavaScript Quickstart for Google Drive API](https://developers.google.com/drive/api/quickstart/js)
- [Google API key restrictions](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions)
- [React audio player example](https://codesandbox.io/s/react-w877cp)
