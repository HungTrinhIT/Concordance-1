import {
  FETCH_EN_DATA,
  FETCH_VI_DATA,
  UPLOAD_DATA_LANGUAGE,
} from "../Action/type";

const initialState = {
  enData: [],
  viData: [],
  languageUpdated: "",
};

let CorpusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EN_DATA:
      state.enData = action.payload;
      return { ...state };
    case FETCH_VI_DATA:
      state.viData = action.payload;
      return { ...state };
    case UPLOAD_DATA_LANGUAGE:
      state.languageUpdated = action.payload;
      return { ...state };
    default:
      return state;
  }
};
export default CorpusReducer;
