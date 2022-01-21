"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadMap = void 0;
const axios_1 = require("axios");
const unzipper = require("unzipper");
const path = require("path");
const fs = require("fs");
const BeatSaber_1 = require("../BeatSaber/BeatSaber");
const https = require("https");
async function downloadMap({ url, folderName }) {
    const tempPath = path.join(process.cwd(), `${folderName}.zip`);
    const writer = fs.createWriteStream(tempPath);
    const response = await (0, axios_1.default)({
        url,
        method: "GET",
        responseType: "stream",
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
    const archive = await unzipper.Open.file(tempPath);
    await archive.extract({ path: `${BeatSaber_1.BeatSaber.gamePath}${BeatSaber_1.BeatSaber.mapsPath}\\${folderName}` });
    await fs.promises.unlink(tempPath);
    return true;
}
exports.downloadMap = downloadMap;
