import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";

const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
