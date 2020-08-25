import {
  FETCH_VI_DATA,
  FETCH_EN_DATA,
  FETCH_SEARCH_DATA,
  FETCH_DETAIL_SENTENCE,
  NEXT_PAGE,
  FETCH_STATIS_QUERY,
  FETCH_STATIS_SUMARY,
} from "../Action/type";

let initialState = {
  initData: {
    viData: [],
    enData: [],
  },
  searchData: null,
  detailSentence: null,
  nextPage: null,
  sumaryData: [
    ["en", 645781, 60032, 32468],
    ["vn", 682632, 60032, 18827],
  ],
  queryData: [],
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
    case FETCH_DETAIL_SENTENCE:
      state.detailSentence = action.payload;
      return { ...state };
    case NEXT_PAGE:
      state.nextPage = action.payload;
      return { ...state };
    case FETCH_STATIS_QUERY:
      state.queryData = action.payload;
      return { ...state };
    case FETCH_STATIS_SUMARY:
      state.sumaryData = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default DataReducer;
