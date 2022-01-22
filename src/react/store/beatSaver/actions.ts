import { SetMapsAction, SetMapsPayload } from "store/beatSaver/types";

export const SET_MAPS = "SET_MAPS";

export function setBeatSaverMaps(payload: SetMapsPayload): SetMapsAction {
	return {
		type: SET_MAPS,
		payload,
	};
}
