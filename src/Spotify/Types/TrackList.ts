export type TrackList = {
    list: Track[];
    total: number;
};

export type Track = {
    name: string;
    artists: Artist[];
};

export type Artist = {
    name: string;
};
