import axios from "axios";
import * as unzipper from "unzipper";
import * as path from "path";
import * as fs from "fs";
import { DownloadMapParameters } from "../../../types/IpcHandlersProps/BeatSaver/DownloadMapParameters";
import { BeatSaber } from "../BeatSaber/BeatSaber";
import * as https from "https";

export async function downloadMap({ url, folderName }: DownloadMapParameters): Promise<boolean> {
    const tempPath = path.join(process.cwd(), `${folderName}.zip`);
    const writer = fs.createWriteStream(tempPath);

    const response = await axios({
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
    await archive.extract({ path: `${BeatSaber.gamePath}${BeatSaber.mapsPath}\\${folderName}` });

    await fs.promises.unlink(tempPath);

    return true;
}
