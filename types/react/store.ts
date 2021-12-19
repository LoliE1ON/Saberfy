export type StoreEvents = {
    "spotify/asyncTask/getLikedTracks": void;
    "spotify/setTracks": {
        list: {
            id: string;
            name: string;
            previewUrl: string;
            artists: {
                name: string;
            }[];
        }[];
        total: number;
    };
    "track/setMaps": {
        trackId: string;
        maps: {
            docs: any[];
        };
    };
    "beatSaber/getPath": void;
    "beatSaber/setPath": string;
};

export type StoreState = {
    tracks: Track[];
    total: number;
    beatSaber: BeatSaber;
};

export type BeatSaber = {
    path: string;
};

export type Track = {
    track: {
        id: string;
        name: string;
        previewUrl: string;
        artists: {
            name: string;
        }[];
    };
    maps: TrackMap[];
};

export type TrackMap = {
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
    versions: {
        coverURL: string;
    }[];
};
