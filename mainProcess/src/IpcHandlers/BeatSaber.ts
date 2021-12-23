import { IpcHandler } from "../../../types";
import { getGamePath } from "../BeatSaber/GamePath";
import { getLocalMaps } from "../BeatSaber/LocalMap";

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

module.exports = [beatSaberGetGamePath, beatSaberGetLocalMaps];
