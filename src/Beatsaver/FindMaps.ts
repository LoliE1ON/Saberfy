import { request } from "./Request";
import { FindMapsParameters } from "./Types";

export async function findMaps(findMapsParameters: FindMapsParameters) {
    const response = await request.get<void>({
        url: `search/text/0?sortOrder=Relevance&q=${findMapsParameters.query}`,
    });

    return response.data;
}
