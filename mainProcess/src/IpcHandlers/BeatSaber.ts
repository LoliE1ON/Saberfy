import { IpcHandler } from "../../../types";
import { getGamePath } from "../BeatSaber/GamePath";
import { deleteMap, getLocalMaps } from "../BeatSaber/Map";

const beatSaberGetGamePath: IpcHandler<void> = {
    name: "beatSaber/getGamePath",
    async handler() {
        return await getGamePath();
    },
};

const beatSaberGetLocalMaps: IpcHandler<void> = {
    name: "beatSaber/getLocalMaps",
    async handler() {
        return await getLocalMaps();
    },
};

const beatSaberDeleteMap: IpcHandler<string> = {
    name: "beatSaber/deleteMap",
    async handler(event, props) {
        return await deleteMap(props);
    },
};

module.exports = [beatSaberGetGamePath, beatSaberGetLocalMaps, beatSaberDeleteMap];
