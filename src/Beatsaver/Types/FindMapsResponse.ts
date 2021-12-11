export type FindMapsResponse = {
    docs: Doc[];
};

export type Doc = {
    name: string;
    description: string;
    createdAt: string;
    stats: Stats;
};

export type Stats = {
    downloads: number;
    downvotes: number;
    plays: number;
    score: number;
    upvotes: number;
};
