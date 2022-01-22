import {
	SetAuthAction,
	SetAuthPayload,
	SetIsLoadTracksAction,
	SetIsLoadTracksPayload,
	SetTracksAction,
	SetTracksPayload,
} from "store/spotify/types";

export const SET_AUTH = "SET_AUTH";
export const SET_IS_LOAD_TRACKS = "SET_IS_LOAD_TRACKS";
export const SET_TRACKS = "SET_TRACKS";

export function setSpotifyAuth(payload: SetAuthPayload): SetAuthAction {
	return {
		type: SET_AUTH,
		payload,
	};
}

export function setSpotifyIsLoadTracks(payload: SetIsLoadTracksPayload): SetIsLoadTracksAction {
	return {
		type: SET_IS_LOAD_TRACKS,
		payload,
	};
}

export function setSpotifyTracks(payload: SetTracksPayload): SetTracksAction {
	return {
		type: SET_TRACKS,
		payload,
	};
}
