"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedGet = void 0;
const axios_1 = __importDefault(require("axios"));
const config = {
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`,
    },
};
const instance = axios_1.default.create(config);
function authenticatedGet(config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield instance.request(Object.assign(Object.assign({}, config), { method: "get" }));
        }
        catch (e) {
            throw new Error("da");
        }
    });
}
exports.authenticatedGet = authenticatedGet;
