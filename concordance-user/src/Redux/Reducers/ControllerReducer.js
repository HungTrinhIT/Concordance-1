import { LANGUAGE_TYPE, UPDATE_PAGE_NUMBER } from "../Action/type";

let initState = {
  language: "english",
  currentPage: 1,
  loaded: false,
};

const ControllerReducer = (state = initState, action) => {
  switch (action.type) {
    case LANGUAGE_TYPE:
      state.language = action.payload;
      return { ...state };
    case UPDATE_PAGE_NUMBER:
      state.currentPage = action.payload;
      return { ...state };
    case "RESET_LOADING":
      state.loaded=action.payload;
      return {...state};
    default:
      return state;
  }
};

export default ControllerReducer;
