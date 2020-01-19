import { REGISTER_ERROR, REGISTER_SUCCESS, CLEAR_MSGS } from "../actions/types";

const initialState = {
  errorMsg: "",
  errorStatus: null,
  user: {},
  isAuthenticated: false,
  token: "",
  msg: ""
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
      return { ...state, errorMsg: action.msg, errorStatus: action.status };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.token);
      return {
        ...state,
        user: action.userPayload,
        msg: action.msg,
        token: action.token,
        isAuthenticated: true
      };
    case CLEAR_MSGS:
      return { ...state, errorMsg: "", errorStatus: null, msg: "" };
    default:
      return state;
  }
};

export default auth;
