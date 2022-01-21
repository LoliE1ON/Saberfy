"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
const types_1 = require("../../types");
const serveStatic_1 = require("./utils/serveStatic");
const Spotify_1 = require("./Spotify/Spotify");
require("dotenv").config();
const isDevelopment = process.env.NODE_ENV === "development";
isDevelopment && require("electron-reload");
const ipcHandlersPath = path.join(__dirname, "./IpcHandlers/");
const ipcHandlersMap = fs
    .readdirSync(ipcHandlersPath)
    .map(file => require(path.join(ipcHandlersPath, file)))
    .flat();
ipcHandlersMap.forEach(handler => electron_1.ipcMain.handle(handler.name, handler.handler));
let mainWindow;
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        electron_1.app.setAsDefaultProtocolClient("saberfy", process.execPath, [path.resolve(process.argv[1])]);
    }
}
else {
    electron_1.app.setAsDefaultProtocolClient("saberfy");
}
electron_1.app.commandLine.appendSwitch("disable-http-cache");
const gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on("second-instance", (event, commandLine, workingDirectory) => {
        // Handle Spotify auth
        const auth = Spotify_1.Spotify.handleAuth(commandLine);
        mainWindow.webContents.send("spotify-auth", auth);
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized())
                mainWindow.restore();
            mainWindow.focus();
        }
    });
    // Create mainWindow, load the rest of the app, etc...
    electron_1.app.whenReady().then(() => {
        createWindow();
    });
}
const createWindow = async () => {
    if (!isDevelopment) {
        await (0, serveStatic_1.serveStatic)();
    }
    const { width, height } = types_1.WindowSizeBase;
    const baseUrl = "http://localhost:3000/index.html";
    mainWindow = new electron_1.BrowserWindow({
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
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
