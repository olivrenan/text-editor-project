import { combineReducers } from "redux";

import todos from "./todos/reducer";
import auth from "./auth/reducer";
import positions from "./positions/reducer";

const allReducers = combineReducers({ todos, auth, positions });

export default allReducers;
