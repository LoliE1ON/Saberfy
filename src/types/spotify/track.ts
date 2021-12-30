export type TracksResponse = {
	items: Item[];
	total: number;
	limit: number;
	offset: number;
};

export type Item = {
	added_at: string;
	track: Track;
};

export type TrackList = {
	list: Item[];
	total: number;
};

export type Track = {
	id: string;
	name: string;
	preview_url: string;
	duration_ms: number;
	album: {
		artists: Artist[];
		images: Image[];
		name: string;
	};
};

export type Artist = {
	name: string;
};
export type Image = {
	url: string;
};
