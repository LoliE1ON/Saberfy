import { IpcHandler, IpcWindowProps } from "../../../types";
import { BrowserWindow } from "electron";

const resizeWindow: IpcHandler<IpcWindowProps> = {
  name: "resizeWindow",
  async handler(event, { width, height }) {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    mainWindow.setSize(width, height);
    mainWindow.center();
  },
};

module.exports = [resizeWindow];
