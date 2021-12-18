import { request } from "./Request";
import { TrackListResponse, PaginationParameters, TrackList } from "./Types";

const defaultPaginationParameters: PaginationParameters = {
    limit: 50,
    offset: 0,
};

export async function getLikedTracks(paginationParameters: PaginationParameters = defaultPaginationParameters): Promise<TrackList> {
    const response = await request.get<TrackListResponse>({
        url: `me/tracks?market=ES&limit=${paginationParameters.limit}&offset=${paginationParameters.offset}`,
    });

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
