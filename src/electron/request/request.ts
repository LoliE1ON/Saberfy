import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

export class Request {
	private readonly instance: AxiosInstance;

	public constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);
	}

	public async get<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return await this.instance.request({
			...config,
			method: "get",
		});
	}
}