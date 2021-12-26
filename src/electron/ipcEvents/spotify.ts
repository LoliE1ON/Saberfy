import { dialog } from "electron";
import { ipc } from "electron/utils";
import { IpcChannel } from "types/ipc";

ipc.handle(IpcChannel.test, (event, args) => {
	dialog.showErrorBox("Welcome Back", args.name);
	return { name: "test response" };
});
