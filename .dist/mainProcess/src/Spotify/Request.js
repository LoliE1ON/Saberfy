"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const Request_1 = require("../Request");
const config = {
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};
exports.request = (0, Request_1.createRequest)(config);
