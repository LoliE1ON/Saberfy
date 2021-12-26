import { IpcTestListener } from "types/ipc/listeners";

export type IpcEventListener = {
	[IpcChannel.test]: IpcTestListener;
};

export enum IpcChannel {
	test = "test",
}
