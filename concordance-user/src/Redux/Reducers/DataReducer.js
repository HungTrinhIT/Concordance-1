import {
  FETCH_VI_DATA,
  FETCH_EN_DATA,
  FETCH_SEARCH_DATA,
  FETCH_DETAIL_SENTENCE,
  NEXT_PAGE,
  FETCH_STATISTIC_DATA,
  FETCH_SUMARY_DATA,
} from "../Action/type";

let initialState = {
  initData: {
    viData: [],
    enData: [],
  },
  searchData: null,
  detailSentence: null,
  nextPage: null,
  statisData: [],
  sumaryStatistic: [],
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
    case FETCH_STATISTIC_DATA:
      state.statisData = action.payload;
      return { ...state };
    case FETCH_SUMARY_DATA
    :
      state.sumaryStatistic = action.payload;
    default:
      return state;
  }
};

export default DataReducer;
