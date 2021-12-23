import { IpcHandler } from "../../../types";
import { getGamePath } from "../BeatSaber/GamePath";
import { deleteMap, getLocalMaps } from "../BeatSaber/Map";
import { downloadMap } from "../Beatsaver/Download";
import { DownloadMapParameters } from "../../../types/IpcHandlersProps/BeatSaver/DownloadMapParameters";

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

const beatSaberDownloadMap: IpcHandler<DownloadMapParameters> = {
    name: "beatSaber/downloadMap",
    async handler(event, props) {
        return await downloadMap(props);
    },
};

module.exports = [beatSaberGetGamePath, beatSaberGetLocalMaps, beatSaberDeleteMap, beatSaberDownloadMap];
