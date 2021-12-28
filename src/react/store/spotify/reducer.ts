import { ConfigActions, SpotifyState } from "store/spotify/types";
import { SET_AUTH } from "store/spotify/actions";

const initialState: SpotifyState = {
	isAuth: false,
};

export const spotifyReducer = (state = initialState, action: ConfigActions) => {
	switch (action.type) {
		case SET_AUTH: {
			return {
				...state,
				isAuth: action.payload,
			};
		}
	}
	return state;
};
