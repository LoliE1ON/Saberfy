import { ipcMain, ipcRenderer, IpcMainEvent } from "electron";
import { IpcChannel, IpcEvent, IpcResponse } from "types/ipc";

export const ipc: Ipc = {
	handle(channel, callback) {
		console.log("reg", channel);
		ipcMain.handle(channel, callback);
	},
	invoke(channel, args) {
		return ipcRenderer.invoke(channel, args);
	},
};

type Ipc = {
	handle<T extends IpcChannel>(
		channel: T,
		callback: (event: IpcMainEvent, args: IpcEvent[T]) => IpcResponse[T]
	): void;
	invoke<T extends IpcChannel>(channel: T, args: IpcEvent[T]): Promise<IpcResponse[T]>;
};
