import { AxiosRequestConfig } from "axios";
import { createRequest } from "../Request";

const config: AxiosRequestConfig = {
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`,
    },
};

export const request = createRequest(config);
