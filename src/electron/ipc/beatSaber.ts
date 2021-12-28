import { ipc } from "utils";
import { IpcChannel } from "types/ipc";
import { deleteMap, getGamePath, getLocalMaps } from "electron/beatSaber";

ipc.handle(IpcChannel.beatSaberGetGamePath, async () => {
	return await getGamePath();
});

ipc.handle(IpcChannel.beatSaberGetLocalMaps, async () => {
	return await getLocalMaps();
});

ipc.handle(IpcChannel.beatSaberDeleteMap, async (event, args) => {
	return await deleteMap(args);
});
