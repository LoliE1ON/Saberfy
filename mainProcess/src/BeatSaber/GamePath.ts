import Registry from "rage-edit";
import * as fs from "fs";
import * as path from "path";
import * as vdf from "vdf";
import { BeatSaberAppId, BeatSaberSteamPath, SteamLibraryFoldersPath, SteamRegistryPath } from "./Constants";

export async function getGamePath(): Promise<string> {
    try {
        const steamPath = await getSteamPath();
        const libraryFolders = `${steamPath}${SteamLibraryFoldersPath}`;

        // TODO: regExp
        const file = await fs.promises.readFile(libraryFolders, "utf8");
        const { libraryfolders }: LibraryFolders = vdf.parse(file);

        for (const folder in libraryfolders) {
            for (const app in libraryfolders[folder].apps) {
                if (Number(app) === BeatSaberAppId) {
                    return path.normalize(`${libraryfolders[folder].path}${BeatSaberSteamPath}`);
                }
            }
        }
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getSteamPath(): Promise<string> {
    const { $values } = await Registry.get(SteamRegistryPath);
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
