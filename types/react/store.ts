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
    "beatSaber/setLocalMaps": string[];
    "beatSaber/deleteMap": string;
    "beatSaber/addLocalMap": string;
    setAuthorize: boolean;
};

export type StoreState = {
    tracks: Track[];
    total: number;
    beatSaber: BeatSaber;
    isAuthorize: boolean;
};

export type BeatSaber = {
    path: string;
    localMaps: string[];
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
    id: string;
    name: string;
    description: string;
    createdAt: string;
    metadata: {
        songName: string;
        levelAuthorName: string;
        songAuthorName: string;
    };
    stats: {
        downloads: number;
        downvotes: number;
        plays: number;
        score: number;
        upvotes: number;
    };
    versions: {
        coverURL: string;
        downloadURL: string;
    }[];
};
