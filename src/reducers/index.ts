import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import problemReducer from "./problemReducer";
import appReducer from "./appReducer";
import noteReducer from "./noteReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  problem: problemReducer,
  app: appReducer,
  note: noteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
