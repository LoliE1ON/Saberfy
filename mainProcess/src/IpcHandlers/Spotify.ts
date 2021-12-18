import { IpcHandler } from "../../../types";
import { getLikedTracks } from "../Spotify";
import { PaginationParameters } from "../Spotify/Types";

const spotifyGetLikedTracks: IpcHandler<PaginationParameters> = {
    name: "spotify/getLikedTracks",
    async handler(event, props) {
        return await getLikedTracks(props);
    },
};

module.exports = [spotifyGetLikedTracks];
