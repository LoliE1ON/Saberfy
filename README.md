# Saberfy (WIP)

Application to search and import your favorite tracks from Spotify to BeatSaber.

![Saberfy preview](https://files.e1on.space/proggrams/saberfy.png)

### Features
- Find maps by song or artist from BeatSaver
- Import map to BeatSaber
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
