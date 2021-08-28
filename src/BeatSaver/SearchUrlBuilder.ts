import { URL } from "url";

export class SearchUrlBuilder {
    public readonly url: URL = new URL("https://beatsaver.com/api/search/text/0");

    public constructor() {
        this.url.searchParams.set("sortOrder","Relevance");
    }

    public setQuery(query: string): SearchUrlBuilder {
        this.url.searchParams.append("q", query);
        return this;
    }
}