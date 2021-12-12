export type StoreEvents = {
    "spotify/setTracks": {
        list: {
            name: string;
            previewUrl: string;
            artists: {
                name: string;
            }[];
        }[];
        total: number;
    };
    "spotify/asyncTask/getLikedTracks": void;
};

export type StoreState = {
    tracks: Tracks;
    total: number;
};

export type Tracks = {
    track: {
        name: string;
        previewUrl: string;
        artists: {
            name: string;
        }[];
    };
    maps: {
        name: string;
        description: string;
        createdAt: string;
        stats: {
            downloads: number;
            downvotes: number;
            plays: number;
            score: number;
            upvotes: number;
        };
    }[];
}[];
