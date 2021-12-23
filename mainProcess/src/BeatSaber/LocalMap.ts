import * as fs from "fs";
import { getGamePath } from "./GamePath";
import { BeatSaberMapsPath } from "./Constants";

export async function getLocalMaps(): Promise<string[]> {
    const beatSaberPath = await getGamePath();
    const mapsPath = `${beatSaberPath}${BeatSaberMapsPath}`;
    if (mapsPath) {
        return fs.readdirSync(mapsPath);
    }

    return [];
}
