import { createStoreon, StoreonModule } from "storeon";
import { StoreEvents, StoreState } from "../../../types";
const { ipcRenderer } = window.require("electron");

const globalStore: StoreonModule<StoreState, StoreEvents> = store => {
  store.on("@init", () => {
    store.dispatch("spotify/asyncTask/getLikedTracks");

    return {
      tracks: [],
      total: 0,
    };
  });

  store.on("spotify/asyncTask/getLikedTracks", async () => {
    const tracks = await ipcRenderer.invoke("spotify/getLikedTracks");
    store.dispatch("spotify/setTracks", tracks);
  });

  store.on("spotify/setTracks", (state, tracks) => {
    return {
      ...state,
      tracks: tracks.list.map(item => ({
        track: item,
        maps: [],
      })),
      total: tracks.total,
    };
  });
};

export const store = createStoreon<StoreState, StoreEvents>([globalStore]);
