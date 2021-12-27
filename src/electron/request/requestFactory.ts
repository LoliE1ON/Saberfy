import { AxiosRequestConfig } from "axios";
import { Request } from "electron/request";

export function createRequest(config: AxiosRequestConfig): Request {
	return new Request(config);
}
