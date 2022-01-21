import { TrackList, TrackListParameters, TracksResponse } from "types/spotify";

import { Spotify, request } from "electron/spotify";

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
