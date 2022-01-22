export type FindMapsResponse = {
	docs: Doc[];
};

export type Doc = {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	stats: Stats;
	versions: Version[];
	metadata: Metadata;
};

export type Stats = {
	downloads: number;
	downvotes: number;
	plays: number;
	score: number;
	upvotes: number;
};

export type Version = {
	coverURL: string;
	downloadURL: string;
};

export type Metadata = {
	bpm: number;
	duration: number;
	levelAuthorName: string;
	songAuthorName: string;
	songName: string;
	songSubName: string;
};
