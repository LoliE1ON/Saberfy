export type LikedTracksResponse = {
    items: Track[];
    total: number;
    limit: number;
    offset: number;
};

export type Track = {
    track: {
        name: string;
        artists: Artist[];
    };
};

export type Artist = {
    name: string;
};
