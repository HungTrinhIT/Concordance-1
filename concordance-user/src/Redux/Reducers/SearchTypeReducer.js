import { SEARCH_TYPE } from "../Action/type";

let initState = {
  type: "word",
};

const SearchTypeReducer = (state = initState, action) => {
  switch (action.type) {
  
    case SEARCH_TYPE:
      state.type = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default SearchTypeReducer;
