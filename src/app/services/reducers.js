import { combineReducers } from "redux";

import todos from "./todos/reducer";
import auth from "./auth/reducer";

const allReducers = combineReducers({ todos, auth });

export default allReducers;
