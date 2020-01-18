import { REGISTER_ERROR, REGISTER_SUCCESS } from "../actions/types";

const initialState = { errorMsg: "", errorStatus: null, user: {}, isAuthenticated: false };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
      return { ...state, errorMsg: action.msg, errorStatus: action.status };
    case REGISTER_SUCCESS:
        localStorage.setItem("token", action.token)
        return { ...state, user: action.userPayload, msg: action.msg, token: action.token, isAuthenticated: true };
    default:
      return state;
  }
};

export default auth;
