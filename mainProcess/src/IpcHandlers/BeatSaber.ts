import { IpcHandler } from "../../../types";
import { getGamePath } from "../BeatSaber/GamePath";

const beatSaberGetGamePath: IpcHandler<void> = {
    name: "beatSaber/getGamePath",
    async handler() {
        return await getGamePath();
    },
};

module.exports = [beatSaberGetGamePath];
