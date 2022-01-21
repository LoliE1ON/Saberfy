import { combineReducers } from "redux";
import { spotifyReducer as spotify } from "store/spotify/reducer";
import { beatSaverReducer as beatSaver } from "store/beatSaver/reducer";

export const reducers = combineReducers({
	spotify,
	beatSaver,
});

export type RootState = ReturnType<typeof reducers>;
