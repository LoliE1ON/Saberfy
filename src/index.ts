import { getLikedSongs } from "./Spotify";

async function application() {
    const songs = await getLikedSongs();
}

application();
