import { combineReducers } from "redux";

import { beatSaberReducer as beatSaber } from "store/beatSaber/reducer";
import { beatSaverReducer as beatSaver } from "store/beatSaver/reducer";
import { spotifyReducer as spotify } from "store/spotify/reducer";

export const reducers = combineReducers({
	spotify,
	beatSaver,
	beatSaber,
});

export type RootState = ReturnType<typeof reducers>;
