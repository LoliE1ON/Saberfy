import { createStoreon, StoreonModule } from "storeon";
import { StoreEvents, StoreState } from "../../../types";

const globalStore: StoreonModule<StoreState, StoreEvents> = store => {
  store.on("@init", () => {
    return {
      tracks: []
    };
  });
};

export const store = createStoreon<StoreState, StoreEvents>([globalStore]);
