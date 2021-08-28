import axios from "axios";
import { URL } from "url";
import { SearchResultInterface } from "./Interfaces/SearchResultInterface";

export class SearchRequester {
    private readonly url: URL;

    constructor(url: URL) {
        this.url = url;
    }

    public async getResult(): Promise<SearchResultInterface> {
        const response = await axios.get(this.url.toString())
        return response.data as SearchResultInterface;
    }
}