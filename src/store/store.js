import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer, userReducer } from "./reducer";
import { thunk } from "redux-thunk";

const store = createStore(
  combineReducers({
    search: reducer,
    user: userReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
