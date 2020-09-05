import { combineReducers } from "redux";
import CorpusReducer from "./corpusReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
  //Reducers
  data: CorpusReducer,
  user: UserReducer,
});

export default rootReducer;
