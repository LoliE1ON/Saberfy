import { SET_AUTH, SET_IS_LOAD_TRACKS, SET_TRACKS } from "store/spotify/actions";
import { TrackList } from "types/spotify";
import { Item } from "types/spotify/track";

export type SpotifyState = {
	tracks: Item[];
	total: number;
	isLoadTracks: boolean;
	isAuth: boolean;
};

export type SetAuthPayload = boolean;
export type SetIsLoadTracksPayload = boolean;
export type SetTracksPayload = TrackList;

export type SetAuthAction = {
	type: typeof SET_AUTH;
	payload: SetAuthPayload;
};
export type SetIsLoadTracksAction = {
	type: typeof SET_IS_LOAD_TRACKS;
	payload: SetIsLoadTracksPayload;
};
export type SetTracksAction = {
	type: typeof SET_TRACKS;
	payload: SetTracksPayload;
};

export type SpotifyActions = SetAuthAction | SetTracksAction | SetIsLoadTracksAction;
