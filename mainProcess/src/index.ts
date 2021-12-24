import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import { IpcHandler, WindowSizeBase } from "../../types";
import { serveStatic } from "./utils/serveStatic";
import { Spotify } from "./Spotify/Spotify";
require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === "development";
isDevelopment && require("electron-reload");

const ipcHandlersPath = path.join(__dirname, "./IpcHandlers/");
const ipcHandlersMap: IpcHandler<never>[] = fs
    .readdirSync(ipcHandlersPath)
    .map(file => require(path.join(ipcHandlersPath, file)))
    .flat();

ipcHandlersMap.forEach(handler => ipcMain.handle(handler.name, handler.handler));
let mainWindow;

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient("saberfy", process.execPath, [path.resolve(process.argv[1])]);
    }
} else {
    app.setAsDefaultProtocolClient("saberfy");
}

app.commandLine.appendSwitch("disable-http-cache");

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        // Handle Spotify auth
        const auth = Spotify.handleAuth(commandLine);
        mainWindow.webContents.send("spotify-auth", auth);

        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
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
