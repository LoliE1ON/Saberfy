import { dialog } from "electron";
import { ipcListenChannel } from "electron/utils";
import { IpcChannel } from "types/ipc";

ipcListenChannel(IpcChannel.test, (event, args) => {
	dialog.showErrorBox("Welcome Back", args.name);
});
