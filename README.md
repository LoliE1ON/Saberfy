# Saberfy (WIP)

Application for match and import your Spotify tracks with BeatSaver and BeatSaber.

![Saberfy preview](https://e1on.space/saberfy_v2.1.png)

### Features
- Find maps by song or artist
- Map sorting
- Map preview

## Dependencies
NodeJS >= 16

## Install

Clone repository

```bash
git clone git@github.com:LoliE1ON/Saberfy.git
```

Go to the project

```bash
cd Saberfy
```

Install all dependencies

```bash
npm i
```

## Setup
- Create Spotify application in the Dashboard: https://developer.spotify.com/dashboard/applications
- Clone ```.env.example``` file as ```.env```
- Set application client id: ```SPOTIFY_CLIENT_ID``` in the ```.env``` file.
- Start application: ```npm start```

## Build
- Standalone build: ```npm run package```
- Installer:  ```npm run make```

## License

MIT
