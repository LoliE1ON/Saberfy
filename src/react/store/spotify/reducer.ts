import { SpotifyActions, SpotifyState } from "store/spotify/types";
import { SET_AUTH, SET_IS_LOAD_TRACKS, SET_TRACKS } from "store/spotify/actions";

const initialState: SpotifyState = {
	tracks: [],
	total: 0,
	isLoadTracks: false,
	isAuth: false,
};

export const spotifyReducer = (state = initialState, action: SpotifyActions) => {
	switch (action.type) {
		case SET_AUTH: {
			return {
				...state,
				isAuth: action.payload,
			};
		}
		case SET_IS_LOAD_TRACKS: {
			return {
				...state,
				isLoadTracks: action.payload,
			};
		}
		case SET_TRACKS: {
			return {
				...state,
				tracks: [...state.tracks, ...action.payload.list],
				total: action.payload.total,
			};
		}
	}
	return state;
};
