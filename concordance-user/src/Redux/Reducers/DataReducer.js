import { FETCH_VI_DATA, FETCH_EN_DATA } from "../Action/type";

let initialState = {
  viData: [],
  enData: [],
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EN_DATA:
      state.enData = action.payload;
      return { ...state };
    case FETCH_VI_DATA:
      state.viData = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default DataReducer;
