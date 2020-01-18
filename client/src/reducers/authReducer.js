import { REGISTER, REGISTER_ERROR } from "../actions/types";

const initialState = { errorMsg: "", errorStatus: null, user: {} };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    //   return Object.assign(action.payload, state);
    return {...state, user: action.payload}
    case REGISTER_ERROR:
      return { ...state, errorMsg: action.msg, errorStatus: action.status };
    default:
      return state;
  }
};

export default auth;
