import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`,
    },
};

const instance = axios.create(config);

export async function authenticatedGet<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
        return await instance.request({
            ...config,
            method: "get",
        });
    } catch (error: any) {
        throw new Error(error);
    }
}
