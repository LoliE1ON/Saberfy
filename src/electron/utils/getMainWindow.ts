import { BrowserWindow } from "electron";

export const getMainWindow = () => {
	return BrowserWindow.getAllWindows()?.[0];
};
