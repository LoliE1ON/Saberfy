import { AxiosRequestConfig } from "axios";
import { createRequest } from "electron/request";

const config: AxiosRequestConfig = {
	baseURL: "https://api.spotify.com/v1/",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
};

export const request = createRequest(config);
