import { ipc } from "utils";
import { IpcChannel } from "types/ipc";
import { beatSaverApi, downloadMap } from "electron/beatSaver";

ipc.handle(IpcChannel.beatSaverFindMaps, async (event, args) => {
	return await beatSaverApi.findMaps(args);
});

ipc.handle(IpcChannel.beatSaverDownloadMap, async (event, args) => {
	return await downloadMap(args);
});
