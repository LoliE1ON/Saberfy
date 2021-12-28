import { SET_AUTH } from "store/spotify/actions";

export type SpotifyState = {
	isAuth: boolean;
};

export type SetAuthPayload = boolean;

export type SetAuthAction = {
	type: typeof SET_AUTH;
	payload: SetAuthPayload;
};

export type ConfigActions = SetAuthAction;
