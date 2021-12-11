import { Track } from "./TrackList";

export type TrackListResponse = {
    items: Item[];
    total: number;
    limit: number;
    offset: number;
};

type Item = {
    track: Track;
};
