import { combineReducers } from "redux";

import localesReducer from "./locales";
import resourceReducer from "./resource";

export const reducers = combineReducers({ localesReducer,resourceReducer });
