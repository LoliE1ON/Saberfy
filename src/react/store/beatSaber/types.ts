import { ADD_LOCAL_MAP, DELETE_LOCAL_MAP, SET_LOCAL_MAPS } from "store/beatSaber/actions";

export type BeatSaberState = {
	localMaps: string[];
};

export type SetLocalMapsPayload = string[];
export type SetLocalMapsAction = {
	type: typeof SET_LOCAL_MAPS;
	payload: SetLocalMapsPayload;
};

export type AddLocalMapPayload = string;
export type AddLocalMapAction = {
	type: typeof ADD_LOCAL_MAP;
	payload: AddLocalMapPayload;
};

export type DeleteLocalMapPayload = string;
export type DeleteLocalMapAction = {
	type: typeof DELETE_LOCAL_MAP;
	payload: DeleteLocalMapPayload;
};

export type BeatSaberActions = SetLocalMapsAction | AddLocalMapAction | DeleteLocalMapAction;
