import { combineReducers } from "redux";
import { authentication } from "./loginReducer";
import { data } from "./dataReducer";

const reducers = combineReducers({
  login: authentication,
  data: data,

});

export default reducers;
