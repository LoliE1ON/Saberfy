import { IpcHandler } from "../../../types";
import { findMaps } from "../Beatsaver";
import { FindMapsProps } from "../../../types/IpcHandlersProps/BeatSaver/FindMapsProps";

const beatSaverFindMaps: IpcHandler<FindMapsProps> = {
    name: "beatSaver/findMaps",
    async handler(event, props) {
        return await findMaps(props);
    },
};

module.exports = [beatSaverFindMaps];
