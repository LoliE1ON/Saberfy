"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GamePath_1 = require("../BeatSaber/GamePath");
const Map_1 = require("../BeatSaber/Map");
const Download_1 = require("../Beatsaver/Download");
const beatSaberGetGamePath = {
    name: "beatSaber/getGamePath",
    async handler() {
        return await (0, GamePath_1.getGamePath)();
    },
};
const beatSaberGetLocalMaps = {
    name: "beatSaber/getLocalMaps",
    async handler() {
        return await (0, Map_1.getLocalMaps)();
    },
};
const beatSaberDeleteMap = {
    name: "beatSaber/deleteMap",
    async handler(event, props) {
        return await (0, Map_1.deleteMap)(props);
    },
};
const beatSaberDownloadMap = {
    name: "beatSaber/downloadMap",
    async handler(event, props) {
        return await (0, Download_1.downloadMap)(props);
    },
};
module.exports = [beatSaberGetGamePath, beatSaberGetLocalMaps, beatSaberDeleteMap, beatSaberDownloadMap];
