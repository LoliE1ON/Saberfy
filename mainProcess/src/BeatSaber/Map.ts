import * as fs from "fs";
import { getGamePath } from "./GamePath";
import { BeatSaber } from "./BeatSaber";

export async function getLocalMaps(): Promise<string[]> {
    if (BeatSaber.localMaps.length) {
        return BeatSaber.localMaps;
    }

    const beatSaberPath = await getGamePath();
    const mapsPath = `${BeatSaber.gamePath}${BeatSaber.mapsPath}`;

    if (beatSaberPath) {
        BeatSaber.localMaps = fs.readdirSync(mapsPath);
    }

    return BeatSaber.localMaps;
}

export async function deleteMap(folderName: string): Promise<boolean> {
    const beatSaberPath = await getGamePath();
    const folderPath = `${beatSaberPath}${BeatSaber.mapsPath}\\${folderName}`;

    try {
        fs.rmdirSync(folderPath, { recursive: true });
        return true;
    } catch {
        return false;
    }
}
