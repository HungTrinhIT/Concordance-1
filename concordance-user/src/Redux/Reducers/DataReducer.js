import {
  FETCH_VI_DATA,
  FETCH_EN_DATA,
  FETCH_SEARCH_DATA,
} from "../Action/type";

let initialState = {
  initData: {
    viData: [],
    enData: [],
  },
  searchData: null,
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EN_DATA:
      state.initData.enData = action.payload;
      return { ...state };
    case FETCH_VI_DATA:
      state.initData.viData = action.payload;
      return { ...state };
    case FETCH_SEARCH_DATA:
      state.searchData = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default DataReducer;
