import { combineReducers } from "redux";
import { spotifyReducer as spotify } from "store/spotify/reducer";

export const reducers = combineReducers({
	spotify,
});

export type RootState = ReturnType<typeof reducers>;
