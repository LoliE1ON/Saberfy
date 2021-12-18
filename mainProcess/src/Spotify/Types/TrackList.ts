export type TrackList = {
    list: Track[];
    total: number;
};

export type Track = {
    id: string;
    name: string;
    previewUrl: string;
    preview_url?: string;
    album?: {
        images: {
            url: string;
        }[];
    };
    artists: Artist[];
};

export type Artist = {
    name: string;
};
