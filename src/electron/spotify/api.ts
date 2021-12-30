import { request, Spotify } from "electron/spotify";
import { TrackListParameters, TracksResponse, TrackList } from "types/spotify";

export const spotifyApi = {
	async getTracks(
		parameters: TrackListParameters = {
			limit: 50,
			offset: 0,
		}
	): Promise<TrackList> {
		const response = await request.get<TracksResponse>({
			url: `me/tracks?market=ES&limit=${parameters.limit}&offset=${parameters.offset}`,
			headers: {
				Authorization: `Bearer ${Spotify.accessToken}`,
			},
		});

		return {
			total: response.data.total,
			list: response.data.items,
		};
	},
};
