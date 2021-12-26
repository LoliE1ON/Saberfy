import { ipcMain } from "electron";
import { IpcChannel, IpcEventListener } from "types/ipc";

import IpcMain = Electron.IpcMain;
import IpcMainEvent = Electron.IpcMainEvent;

type IpcListenCallback = (event: IpcMainEvent, args: IpcEventListener[IpcChannel]) => void;

export function ipcListenChannel(channel: IpcChannel, callback: IpcListenCallback): IpcMain {
	return ipcMain.on(channel, callback);
}
