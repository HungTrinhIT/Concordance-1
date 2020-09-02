import { combineReducers } from "redux";
import SearchTypeReducer from "./SearchTypeReducer";
import TagReducer from "./TagReducer";
import ControllerReducer from "./ControllerReducer";
import DataReducer from "./DataReducer";

const RootReducer = combineReducers({
  SearchType: SearchTypeReducer,
  Tag: TagReducer,
  Controller: ControllerReducer,
  Data: DataReducer,
});

export default RootReducer;
