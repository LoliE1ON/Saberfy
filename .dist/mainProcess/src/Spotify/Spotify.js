"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spotify = void 0;
class Spotify {
    static accessToken = null;
    static getAuthUrl() {
        const parameters = {
            response_type: "token",
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: "user-library-read",
            state: "",
            redirect_uri: "saberfy://auth/",
        };
        const url = new URL("https://accounts.spotify.com/authorize");
        url.search = new URLSearchParams(parameters).toString();
        return url.toString();
    }
    static handleAuth(commandLine) {
        const urlParams = commandLine.pop();
        const params = new URLSearchParams(urlParams);
        if (params.has("saberfy://auth/#access_token")) {
            Spotify.accessToken = params.get("saberfy://auth/#access_token");
            return true;
        }
        return false;
    }
}
exports.Spotify = Spotify;
