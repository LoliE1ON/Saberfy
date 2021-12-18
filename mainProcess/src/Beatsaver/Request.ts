import * as https from "https";
import { AxiosRequestConfig } from "axios";
import { createRequest } from "../Request";

const config: AxiosRequestConfig = {
    baseURL: "https://beatsaver.com/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
};

export const request = createRequest(config);
