import { createStoreon, StoreonModule } from "storeon";
import { StoreEvents, StoreState } from "../../../types";

const globalStore: StoreonModule<StoreState, StoreEvents> = store => {
    store.on("@init", () => {
        return {
            tracks: [],
            total: 0,
        };
    });

    store.on("spotify/setTracks", (state, tracks) => {
        return {
            ...state,
            tracks: [
                ...state.tracks,
                ...tracks.list.map(item => ({
                    track: item,
                    maps: [],
                })),
            ],
            total: tracks.total,
        };
    });

    store.on("track/setMaps", (state, maps) => {
        const tracks = state.tracks.map(item => {
            if (item.track.id === maps.trackId) {
                console.log(maps.maps.docs);
                return { ...item, maps: maps.maps.docs };
            }
            return item;
        });

        return {
            ...state,
            tracks,
        };
    });
};

export const store = createStoreon<StoreState, StoreEvents>([globalStore]);
