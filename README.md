# Saberfy (WIP)

Application to search and import tracks from BeatSaver to BeatSaber.

![Saberfy preview](https://files.e1on.space/proggrams/saberfy.png)

### Features
- Find Spotify favorite tracks in BeatSaver
- Find maps by song or artist from BeatSaver
- Import maps to BeatSaber
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
- Set Spotify clientId in `src/config/spotify.ts` file
- Start application: ```npm start```

## Build
- Standalone build: ```npm run package```
- Installer:  ```npm run make```

## License

MIT
