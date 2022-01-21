"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Beatsaver_1 = require("../Beatsaver");
const beatSaverFindMaps = {
    name: "beatSaver/findMaps",
    async handler(event, props) {
        return await (0, Beatsaver_1.findMaps)(props);
    },
};
module.exports = [beatSaverFindMaps];
