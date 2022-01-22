import {
	AddLocalMapAction,
	AddLocalMapPayload,
	DeleteLocalMapAction,
	DeleteLocalMapPayload,
	SetLocalMapsAction,
	SetLocalMapsPayload,
} from "store/beatSaber/types";

export const SET_LOCAL_MAPS = "SET_LOCAL_MAPS";
export const ADD_LOCAL_MAP = "ADD_LOCAL_MAP";
export const DELETE_LOCAL_MAP = "DELETE_LOCAL_MAP";

export function setBeatSaberLocalMaps(payload: SetLocalMapsPayload): SetLocalMapsAction {
	return {
		type: SET_LOCAL_MAPS,
		payload,
	};
}

export function addBeatSaberLocalMap(payload: AddLocalMapPayload): AddLocalMapAction {
	return {
		type: ADD_LOCAL_MAP,
		payload,
	};
}

export function deleteBeatSaberLocalMap(payload: DeleteLocalMapPayload): DeleteLocalMapAction {
	return {
		type: DELETE_LOCAL_MAP,
		payload,
	};
}
