import { combineReducers } from "redux";
import CorpusReducer from "./corpusReducer";

const rootReducer = combineReducers({
  //Reducers
  data: CorpusReducer,
});

export default rootReducer;
