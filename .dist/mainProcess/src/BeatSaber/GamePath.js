"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGamePath = void 0;
const rage_edit_1 = require("rage-edit");
const fs = require("fs");
const path = require("path");
const vdf = require("vdf");
const BeatSaber_1 = require("./BeatSaber");
async function getGamePath() {
    if (BeatSaber_1.BeatSaber.gamePath) {
        return BeatSaber_1.BeatSaber.gamePath;
    }
    try {
        const steamPath = await getSteamPath();
        const libraryFolders = `${steamPath}${BeatSaber_1.BeatSaber.steamLibraryFoldersPath}`;
        // TODO: regExp
        const file = await fs.promises.readFile(libraryFolders, "utf8");
        const { libraryfolders } = vdf.parse(file);
        for (const folder in libraryfolders) {
            for (const app in libraryfolders[folder].apps) {
                if (Number(app) === BeatSaber_1.BeatSaber.appId) {
                    BeatSaber_1.BeatSaber.gamePath = path.normalize(`${libraryfolders[folder].path}${BeatSaber_1.BeatSaber.steamPath}`);
                }
            }
        }
        return BeatSaber_1.BeatSaber.gamePath;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getGamePath = getGamePath;
async function getSteamPath() {
    const { $values } = await rage_edit_1.default.get(BeatSaber_1.BeatSaber.steamRegistryPath);
    return $values.installpath;
}
