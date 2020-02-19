import { applyMiddleware, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducer from "./reducer";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(reduxThunk),
    typeof window === "object" &&
      typeof window.devToolsExtension !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
