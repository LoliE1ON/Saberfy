import { FindMapsParameters, FindMapsResponse } from "types/beatSaver";

import { request } from "electron/beatSaver";

export const beatSaverApi = {
	async findMaps(findMapsParameters: FindMapsParameters): Promise<FindMapsResponse> {
		const response = await request.get<FindMapsResponse>({
			url: `search/text/0?sortOrder=Relevance&q=${encodeURI(findMapsParameters.query)}`,
		});

		return response.data;
	},
};
