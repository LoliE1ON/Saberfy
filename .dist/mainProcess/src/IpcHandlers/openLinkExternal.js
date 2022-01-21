"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const openLinkExternal = {
    name: "openLinkExternal",
    handler(event, url) {
        electron_1.shell.openExternal(url).catch(console.error);
    },
};
module.exports = [openLinkExternal];
