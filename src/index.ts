import { app, BrowserWindow } from "electron";
import { registerAppProtocol } from "electron/utils/registerAppProtocol";
import { setupDevTools } from "electron/utils/setupDevTools";
import "electron/ipcEvents";

if (require("electron-squirrel-startup")) {
	// eslint-disable-line global-require
	app.quit();
}

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const isDevelopment = !app.isPackaged;
const appLock = app.requestSingleInstanceLock();

const WINDOW_WIDTH = 1240;
const WINDOW_HEIGHT = 900;
const DEVTOOLS_WIDTH = 500;

let mainWindow: BrowserWindow = null;

registerAppProtocol(app);
setupDevTools(app, DEVTOOLS_WIDTH);

const createWindow = (): void => {
	mainWindow = new BrowserWindow({
		height: WINDOW_HEIGHT,
		width: isDevelopment ? WINDOW_WIDTH + DEVTOOLS_WIDTH : WINDOW_WIDTH,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).catch(console.error);
	mainWindow.setMenu(null);

	isDevelopment && mainWindow.webContents.openDevTools();
};

appLock || app.quit();

if (appLock) {
	app.on("second-instance", (event, commandLine) => {
		mainWindow.webContents.send("spotify-auth", commandLine);

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
