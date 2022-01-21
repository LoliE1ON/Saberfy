"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikedTracks = void 0;
const Request_1 = require("./Request");
const Spotify_1 = require("./Spotify");
const defaultPaginationParameters = {
    limit: 50,
    offset: 0,
};
async function getLikedTracks(paginationParameters = defaultPaginationParameters) {
    const response = await Request_1.request.get({
        url: `me/tracks?market=ES&limit=${paginationParameters.limit}&offset=${paginationParameters.offset}`,
        headers: {
            Authorization: `Bearer ${Spotify_1.Spotify.accessToken}`,
        },
    });
    console.log(response);
    const tracks = response.data.items.map(item => {
        const id = item.track.id;
        const name = item.track.name;
        const previewUrl = item.track.album.images[0].url;
        const artists = item.track.artists.map(artist => {
            return { name: artist.name };
        });
        return { name, artists, previewUrl, id };
    });
    return {
        total: response.data.total,
        list: tracks,
    };
}
exports.getLikedTracks = getLikedTracks;
