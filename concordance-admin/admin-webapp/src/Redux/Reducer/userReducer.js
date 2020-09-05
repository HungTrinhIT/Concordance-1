import { FETCH_CREDENTIALS, LOG_OUT } from "../Action/type";

const initialState = {
  credentials: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREDENTIALS:
      state.credentials = action.payload;
      return { ...state };
    case LOG_OUT:
        state.credentials=action.payload;
        return{...state};
    default:
      return state;
  }
};

export default UserReducer;
