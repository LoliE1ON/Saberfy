"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const https = require("https");
const Request_1 = require("../Request");
const config = {
    baseURL: "https://beatsaver.com/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
};
exports.request = (0, Request_1.createRequest)(config);
