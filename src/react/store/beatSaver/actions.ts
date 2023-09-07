import {SetMapsAction, SetMapsPayload, UpdateMapsAction, UpdateMapsPayload} from "store/beatSaver/types";

export const SET_MAPS = "SET_MAPS";
export const UPDATE_MAPS = "UPDATE_MAPS";

export function setBeatSaverMaps(payload: SetMapsPayload): SetMapsAction {
	return {
		type: SET_MAPS,
		payload,
	};
}

export function updateBeatSaverMaps(payload: UpdateMapsPayload): UpdateMapsAction {
	return {
		type: UPDATE_MAPS,
		payload,
	};
}
