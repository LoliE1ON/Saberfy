import { authenticatedGet } from "./Request";
import { LikedSongsResponse, PaginationParameters } from "./Types";

const defaultPaginationParameters: PaginationParameters = {
    limit: 50,
    offset: 0,
};

export async function getLikedSongs(paginationParameters: PaginationParameters = defaultPaginationParameters): Promise<LikedSongsResponse> {
    const response = await authenticatedGet<LikedSongsResponse>({
        url: "me/tracks",
        data: {
            ...paginationParameters,
        },
    });

    return response.data;
}
