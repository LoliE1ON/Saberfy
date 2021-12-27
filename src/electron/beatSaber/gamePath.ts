// @ts-ignore
import Registry from "rage-edit";
import * as fs from "fs";
import * as path from "path";
// @ts-ignore
import * as vdf from "vdf";
import { BeatSaber } from "electron/beatSaber";

export async function getGamePath(): Promise<string> {
	if (BeatSaber.gamePath) {
		return BeatSaber.gamePath;
	}

	try {
		const steamPath = await getSteamPath();
		const libraryFolders = `${steamPath}${BeatSaber.steamLibraryFoldersPath}`;

		// TODO: regExp
		const file = await fs.promises.readFile(libraryFolders, "utf8");
		const { libraryfolders }: LibraryFolders = vdf.parse(file);

		for (const folder in libraryfolders) {
			for (const app in libraryfolders[folder].apps) {
				if (Number(app) === BeatSaber.appId) {
					BeatSaber.gamePath = path.normalize(`${libraryfolders[folder].path}${BeatSaber.steamPath}`);
				}
			}
		}

		return BeatSaber.gamePath;
	} catch (error: any) {
		throw new Error(error);
	}
}

async function getSteamPath(): Promise<string> {
	const { $values } = await Registry.get(BeatSaber.steamRegistryPath);
	return $values.installpath;
}

type LibraryFolders = {
	libraryfolders: LibraryFolder;
};

type LibraryFolder = Item<Folder>;
type App = Item<string>;

type Folder = {
	path: string;
	apps: App[];
};

type Item<T> = {
	[key: string]: T;
};
