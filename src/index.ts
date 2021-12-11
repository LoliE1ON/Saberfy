require("dotenv").config();
import { getLikedTracks } from "./Spotify";

async function application() {
    const tracks = await getLikedTracks();

    console.log(tracks);
}

application();
