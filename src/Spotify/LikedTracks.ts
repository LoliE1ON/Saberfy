import { authenticatedGet } from "./Request";
import { TrackListResponse, PaginationParameters, TrackList } from "./Types";

const defaultPaginationParameters: PaginationParameters = {
    limit: 50,
    offset: 0,
};

export async function getLikedTracks(paginationParameters: PaginationParameters = defaultPaginationParameters): Promise<TrackList> {
    const response = await authenticatedGet<TrackListResponse>({
        url: `me/tracks?market=ES&limit=${paginationParameters.limit}&offset=${paginationParameters.offset}`,
    });

    const tracks = response.data.items.map(item => {
        const name = item.track.name;
        const artists = item.track.artists.map(artist => {
            return { name: artist.name };
        });

        return { name, artists };
    });

    return {
        total: response.data.total,
        list: tracks,
    };
}
