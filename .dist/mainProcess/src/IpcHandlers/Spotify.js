"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Spotify_1 = require("../Spotify");
const electron_1 = require("electron");
const Spotify_2 = require("../Spotify/Spotify");
const spotifyGetLikedTracks = {
    name: "spotify/getLikedTracks",
    async handler(event, props) {
        return await (0, Spotify_1.getLikedTracks)(props);
    },
};
const spotifyOpenAuthLink = {
    name: "spotify/openAuthLink",
    async handler(event, props) {
        electron_1.shell.openExternal(Spotify_2.Spotify.getAuthUrl()).catch(console.error);
    },
};
module.exports = [spotifyGetLikedTracks, spotifyOpenAuthLink];
