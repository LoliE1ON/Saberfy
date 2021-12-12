import { IpcHandler } from "../../../types";
import { getLikedTracks } from "../Spotify";

const spotifyGetLikedTracks: IpcHandler<void> = {
  name: "spotify/getLikedTracks",
  async handler() {
    return await getLikedTracks();
  },
};

module.exports = [spotifyGetLikedTracks];
