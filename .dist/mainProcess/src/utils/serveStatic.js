"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const nodeStatic = require("node-static");
const path = require("path");
const http = require("http");
const serveStatic = async () => {
    const server = new nodeStatic.Server(path.join(__dirname, "../../../rendererProcess"));
    await new Promise((resolve, reject) => {
        http
            .createServer((request, response) => {
            request.addListener("end", () => server.serve(request, response)).resume();
        })
            .listen(3000)
            .on("listening", resolve)
            .on("error", reject);
    });
};
exports.serveStatic = serveStatic;
