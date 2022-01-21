"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = void 0;
const Request_1 = require("./Request");
function createRequest(config) {
    return new Request_1.Request(config);
}
exports.createRequest = createRequest;
