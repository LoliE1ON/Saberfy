export type FindMapsParameters = {
	query: string;
	page: number;
	order: FindMapsOrder;
};

export type FindMapsOrder = "Relevance" | "Latest" | "Rating" | "Curated";