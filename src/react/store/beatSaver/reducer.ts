import { BeatSaverActions, BeatSaverState } from "store/beatSaver/types";
import { SET_MAPS } from "store/beatSaver/actions";

const initialState: BeatSaverState = {
	maps: [],
};

export const beatSaverReducer = (state = initialState, action: BeatSaverActions) => {
	switch (action.type) {
		case SET_MAPS: {
			return {
				...state,
				maps: action.payload,
			};
		}
	}
	return state;
};
