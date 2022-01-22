import { SET_MAPS } from "store/beatSaver/actions";
import { Doc } from "types/beatSaver";

export type BeatSaverState = {
	maps: Doc[];
};

export type SetMapsPayload = Doc[];
export type SetMapsAction = {
	type: typeof SET_MAPS;
	payload: SetMapsPayload;
};

export type BeatSaverActions = SetMapsAction;
