import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import * as fs from "fs";
import { IpcHandler, WindowSizeBase } from "../../types";
import { serveStatic } from "./utils/serveStatic";
require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === "development";

try {
    isDevelopment && require("electron-reloader")(module);
} catch {}

const ipcHandlersPath = path.join(__dirname, "./IpcHandlers/");
const ipcHandlersMap: IpcHandler<never>[] = fs
    .readdirSync(ipcHandlersPath)
    .map(file => require(path.join(ipcHandlersPath, file)))
    .flat();

ipcHandlersMap.forEach(handler => ipcMain.handle(handler.name, handler.handler));

let mainWindow;

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient("spoti-saber", process.execPath, [path.resolve(process.argv[1])]);
    }
} else {
    app.setAsDefaultProtocolClient("spoti-saber");
}

app.commandLine.appendSwitch("disable-http-cache");

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }

        mainWindow.webContents.send("open-by-link", { args: commandLine });
    });

    // Create mainWindow, load the rest of the app, etc...
    app.whenReady().then(() => {
        createWindow();
    });
}

const createWindow = async (): Promise<void> => {
    if (!isDevelopment) {
        await serveStatic();
    }
    const { width, height } = WindowSizeBase;
    const baseUrl = "http://localhost:3000/index.html";

    mainWindow = new BrowserWindow({
        width,
        height,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.setMenu(null);
    isDevelopment && mainWindow.webContents.openDevTools({ mode: "detach" });
    mainWindow.loadURL(baseUrl).catch(console.error);
};

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
