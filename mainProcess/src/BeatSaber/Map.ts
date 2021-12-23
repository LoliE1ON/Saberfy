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

export async function deleteMap(folderName: string): Promise<boolean> {
    const beatSaberPath = await getGamePath();
    const folderPath = `${beatSaberPath}${BeatSaberMapsPath}\\${folderName}`;

    try {
        fs.rmdirSync(folderPath, { recursive: true });
        return true;
    } catch {
        return false;
    }
}
