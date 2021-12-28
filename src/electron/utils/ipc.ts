import { ipcMain, ipcRenderer, IpcMainEvent, IpcRendererEvent } from "electron";
import { IpcChannel, IpcEvent, IpcResponse } from "types/ipc";

export const ipc: Ipc = {
	handle(channel, callback) {
		ipcMain.handle(channel, callback);
	},
	invoke(channel, args) {
		return ipcRenderer.invoke(channel, args);
	},
	on(channel, callback) {
		console.log(channel, callback);
		ipcRenderer.on(channel, callback);
	},
};

type Ipc = {
	handle<T extends IpcChannel>(
		channel: T,
		callback: (event: IpcMainEvent, args: IpcEvent[T]) => Promise<IpcResponse[T]>
	): void;
	invoke<T extends IpcChannel>(channel: T, args: IpcEvent[T]): Promise<IpcResponse[T]>;
	on<T extends IpcChannel>(channel: T, callback: (event: IpcRendererEvent, ...args: IpcEvent[T][]) => void): void;
};
