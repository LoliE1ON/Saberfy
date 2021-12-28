import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { reducers } from "store/reducers";

export const store = createStore(reducers, applyMiddleware(logger));
