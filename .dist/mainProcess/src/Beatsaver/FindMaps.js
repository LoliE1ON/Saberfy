"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMaps = void 0;
const Request_1 = require("./Request");
async function findMaps(findMapsParameters) {
    const response = await Request_1.request.get({
        url: `search/text/0?sortOrder=Relevance&q=${encodeURI(findMapsParameters.query)}`,
    });
    return response.data;
}
exports.findMaps = findMaps;
