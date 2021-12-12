import { request } from "./Request";
import { FindMapsParameters, FindMapsResponse } from "./Types";

export async function findMaps(findMapsParameters: FindMapsParameters): Promise<FindMapsResponse> {
    const response = await request.get<FindMapsResponse>({
        url: `search/text/0?sortOrder=Relevance&q=${findMapsParameters.query}`,
    });

    return response.data;
}
