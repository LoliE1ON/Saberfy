import { SetAuthAction, SetAuthPayload } from "store/spotify/types";

export const SET_AUTH = "SET_AUTH";

export function setSpotifyAuth(payload: SetAuthPayload): SetAuthAction {
	return {
		type: SET_AUTH,
		payload,
	};
}
