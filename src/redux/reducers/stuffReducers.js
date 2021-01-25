import { GET_STUFFS, DELETE_STUFF } from "../constants/stuffConstants";

const INITIAL_STATE = {
  stuffs: [],
};

const stuffReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_STUFFS:
      return {
        stuffs: [action.payload],
      };

    case DELETE_STUFF:
      return {
        stuffs: state.stuffs.filter((s) => s._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default stuffReducer;
