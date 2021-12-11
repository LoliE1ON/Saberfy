import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import {
  IpcHandler,
  OpenWindowProps,
  WindowSizeBase
} from "../../types";
import { serveStatic } from "./utils/serveStatic";

const isDevelopment = process.env.NODE_ENV === "development";

const ipcHandlersPath = path.join(__dirname, "./IpcHandlers/");
const ipcHandlersMap: IpcHandler<never>[] = fs
  .readdirSync(ipcHandlersPath)
  .map(file => require(path.join(ipcHandlersPath, file)))
  .flat();

ipcHandlersMap.forEach(handler => ipcMain.handle(handler.name, handler.handler));

const openWindow = async ({
  width,
  height,
  route,
}: OpenWindowProps): Promise<BrowserWindow> => {
  const baseUrl = "http://localhost:3000/index.html";

  const window = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.setMenu(null);
  isDevelopment && window.webContents.openDevTools({ mode: "detach" });
  window.loadURL(`${baseUrl}#/${route}`).catch(console.error);

  return window;
};

const createWindow = async (): Promise<void> => {
  if (!isDevelopment) {
    await serveStatic();
  }

  await openWindow({ ...WindowSizeBase, route: "" });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow().catch(console.error);
  }
});
