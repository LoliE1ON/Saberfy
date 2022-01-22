import { IpcMainInvokeEvent } from "electron";

export type IpcHandler<IPCEventArgs> = {
	name: string;
	handler: (event: IpcMainInvokeEvent, args: IPCEventArgs) => void;
};
