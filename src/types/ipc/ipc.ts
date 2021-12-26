import { IpcTestListener } from "types/ipc/listeners";
import { IpcTestResponse } from "types/ipc/responses/ipcTestResponse";

export type IpcEvent = {
	[IpcChannel.test]: IpcTestListener;
	[IpcChannel.a]: void;
	[IpcChannel.b]: boolean;
};

export type IpcResponse = {
	[IpcChannel.test]: IpcTestResponse;
	[IpcChannel.a]: void;
	[IpcChannel.b]: boolean;
};

export enum IpcChannel {
	test = "test",
	a = "a",
	b = "b",
}
