"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const resizeWindow = {
    name: "resizeWindow",
    async handler(event, { width, height }) {
        const mainWindow = electron_1.BrowserWindow.getAllWindows()[0];
        mainWindow.setSize(width, height);
        mainWindow.center();
    },
};
module.exports = [resizeWindow];
