import { AxiosRequestConfig } from "axios";
import { Request } from "./Request";

export function createRequest(config: AxiosRequestConfig): Request {
    return new Request(config);
}
