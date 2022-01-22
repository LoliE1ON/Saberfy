import { ADD_LOCAL_MAP, DELETE_LOCAL_MAP, SET_LOCAL_MAPS } from "store/beatSaber/actions";
import { BeatSaberActions, BeatSaberState } from "store/beatSaber/types";

const initialState: BeatSaberState = {
	localMaps: [],
};

export const beatSaberReducer = (state = initialState, action: BeatSaberActions) => {
	switch (action.type) {
		case SET_LOCAL_MAPS: {
			return {
				...state,
				localMaps: action.payload,
			};
		}
		case ADD_LOCAL_MAP: {
			return {
				...state,
				localMaps: [...state.localMaps, action.payload],
			};
		}
		case DELETE_LOCAL_MAP: {
			return {
				...state,
				localMaps: state.localMaps.filter(map => map !== action.payload),
			};
		}
	}
	return state;
};
