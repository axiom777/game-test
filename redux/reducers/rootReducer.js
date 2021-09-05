import { combineReducers } from "redux";
import catalog from "./catalog";
import config from "./config";

const rootReducer = combineReducers({
  catalog,
  config,
});

export default rootReducer;
