import { combineReducers } from "redux";
import items from "./itemsReducer";
import auth from "./authReducer";

export default combineReducers({
  items,
  auth
});
