import { authenticatedGet } from "./Request";
import { LikedTracksResponse, PaginationParameters, TrackList } from "./Types";

const defaultPaginationParameters: PaginationParameters = {
    limit: 50,
    offset: 0,
};

export async function getLikedTracks(paginationParameters: PaginationParameters = defaultPaginationParameters): Promise<TrackList> {
    const response = await authenticatedGet<LikedTracksResponse>({
        url: `me/tracks?market=ES&limit=${paginationParameters.limit}&offset=${paginationParameters.offset}`,
    });

    return response.data.items.map(track => {
        const name = track.track.name;
        const artists = track.track.artists.map(artist => {
            return { name: artist.name };
        });

        return { name, artists };
    });
}
