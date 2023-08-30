import { BrowserWindow, app } from "electron";
import { Application } from "main/application";
import { Spotify } from "spotify";
import { ipc } from "utils";

import { IpcChannel } from "types/ipc";

import "electron/ipc";
import { registerAppProtocol } from "electron/utils/registerAppProtocol";
import { setupDevTools } from "electron/utils/setupDevTools";

require("dotenv").config();

if (require("electron-squirrel-startup")) {
	app.quit();
}

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const isDevelopment = !app.isPackaged;
const appLock = app.requestSingleInstanceLock();

const WINDOW_WIDTH = 1350;
const WINDOW_HEIGHT = 900;
const DEVTOOLS_WIDTH = 500;

let mainWindow: BrowserWindow = null;

registerAppProtocol(app);
//(app, DEVTOOLS_WIDTH);

const createWindow = (): void => {
	mainWindow = new BrowserWindow({
		frame: false,
		height: WINDOW_HEIGHT,
		width: isDevelopment ? WINDOW_WIDTH + DEVTOOLS_WIDTH : WINDOW_WIDTH,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				"Content-Security-Policy": ["script-src *;image-src *"],
			},
		});
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).catch(console.error);
	mainWindow.setMenu(null);

	isDevelopment && mainWindow.webContents.openDevTools();
};

appLock || app.quit();

if (appLock) {
	app.on("second-instance", (event, commandLine) => {
		Application.isAuth = Spotify.handleAuth(commandLine);
		mainWindow.webContents.send(IpcChannel.spotifyAuth, Application.isAuth);

		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	app.whenReady().then(() => {
		createWindow();
	});
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
