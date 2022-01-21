"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMap = exports.getLocalMaps = void 0;
const fs = require("fs");
const GamePath_1 = require("./GamePath");
const BeatSaber_1 = require("./BeatSaber");
async function getLocalMaps() {
    if (BeatSaber_1.BeatSaber.localMaps.length) {
        return BeatSaber_1.BeatSaber.localMaps;
    }
    const beatSaberPath = await (0, GamePath_1.getGamePath)();
    const mapsPath = `${BeatSaber_1.BeatSaber.gamePath}${BeatSaber_1.BeatSaber.mapsPath}`;
    if (beatSaberPath) {
        BeatSaber_1.BeatSaber.localMaps = fs.readdirSync(mapsPath);
    }
    return BeatSaber_1.BeatSaber.localMaps;
}
exports.getLocalMaps = getLocalMaps;
async function deleteMap(folderName) {
    const beatSaberPath = await (0, GamePath_1.getGamePath)();
    const folderPath = `${beatSaberPath}${BeatSaber_1.BeatSaber.mapsPath}\\${folderName}`;
    try {
        fs.rmdirSync(folderPath, { recursive: true });
        return true;
    }
    catch {
        return false;
    }
}
exports.deleteMap = deleteMap;
