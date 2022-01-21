"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const axios_1 = require("axios");
class Request {
    instance;
    constructor(config) {
        this.instance = axios_1.default.create(config);
    }
    async get(config) {
        return await this.instance.request({
            ...config,
            method: "get",
        });
    }
}
exports.Request = Request;
