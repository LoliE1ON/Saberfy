import { ipcMain, dialog } from "electron";

ipcMain.on("123", () => {
	dialog.showErrorBox("Welcome Back", `Test IPC Events`);
});
