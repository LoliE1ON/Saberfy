import { IpcHandler } from "../../../types";
import { getLikedTracks } from "../Spotify";
import { PaginationParameters } from "../Spotify/Types";
import { shell } from "electron";
import { Spotify } from "../Spotify/Spotify";

const spotifyGetLikedTracks: IpcHandler<PaginationParameters> = {
    name: "spotify/getLikedTracks",
    async handler(event, props) {
        return await getLikedTracks(props);
    },
};

const spotifyOpenAuthLink: IpcHandler<void> = {
    name: "spotify/openAuthLink",
    async handler(event, props) {
        shell.openExternal(Spotify.getAuthUrl()).catch(console.error);
    },
};

module.exports = [spotifyGetLikedTracks, spotifyOpenAuthLink];
