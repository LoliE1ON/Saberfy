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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikedSongs = void 0;
const Request_1 = require("./Request");
const defaultPaginationParameters = {
    limit: 50,
    offset: 0,
};
function getLikedSongs(paginationParameters = defaultPaginationParameters) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, Request_1.authenticatedGet)({
            url: "me/tracks",
            data: Object.assign({}, paginationParameters),
        });
        return response.data;
    });
}
exports.getLikedSongs = getLikedSongs;
