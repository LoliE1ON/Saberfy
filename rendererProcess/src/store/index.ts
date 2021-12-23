import { createStoreon, StoreonModule } from "storeon";
import { StoreEvents, StoreState } from "../../../types";

const { ipcRenderer } = window.require("electron");

const globalStore: StoreonModule<StoreState, StoreEvents> = store => {
    store.on("@init", () => {
        ipcRenderer.invoke("beatSaber/getLocalMaps").then((localMaps: string[]) => {
            store.dispatch("beatSaber/setLocalMaps", localMaps);
        });

        store.dispatch("beatSaber/getPath");
        return {
            tracks: [],
            total: 0,
            beatSaber: {
                path: "",
                localMaps: [],
            },
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

    store.on("beatSaber/setLocalMaps", (state, localMaps) => {
        return {
            ...state,
            beatSaber: {
                ...state.beatSaber,
                localMaps,
            },
        };
    });

    store.on("beatSaber/addLocalMap", (state, folderName) => {
        return {
            ...state,
            beatSaber: {
                ...state.beatSaber,
                localMaps: [...state.beatSaber.localMaps, folderName],
            },
        };
    });

    store.on("beatSaber/deleteMap", (state, deleteMap) => {
        return {
            ...state,
            beatSaber: {
                ...state.beatSaber,
                localMaps: state.beatSaber.localMaps.filter(map => map !== deleteMap),
            },
        };
    });

    store.on("beatSaber/getPath", state => {
        ipcRenderer.invoke("beatSaber/getGamePath").then(path => {
            store.dispatch("beatSaber/setPath", path);
        });
    });

    store.on("beatSaber/setPath", (state, path) => {
        return {
            ...state,
            beatSaber: {
                ...state.beatSaber,
                path,
            },
        };
    });

    store.on("track/setMaps", (state, maps) => {
        const tracks = state.tracks.map(item => {
            if (item.track.id === maps.trackId) {
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
