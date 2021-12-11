require("dotenv").config();
import { findMaps } from "./Beatsaver";
import { getLikedTracks } from "./Spotify";

async function application() {
    const tracks = await getLikedTracks();
    const maps = await findMaps({ query: "test"});

    console.log(maps);
}

application();
