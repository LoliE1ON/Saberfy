import * as fs from "fs";
import { BeatSaber, getGamePath } from "electron/beatSaber";

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
	const folderPath = `${BeatSaber.gamePath}${BeatSaber.mapsPath}\\${folderName}`;

	try {
		fs.rmdirSync(folderPath, { recursive: true });
		return true;
	} catch {
		return false;
	}
}
